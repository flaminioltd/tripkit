import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Modal, Portal, Button, Divider, List } from 'react-native-paper';
import { budgetRepo } from '../repositories/budget-repository';
import { useAppStore } from '../stores/app-store';
import { COUNTRIES } from '../lib/countries';

interface Props {
  visible: boolean;
  trip: any | null;
  onDismiss: () => void;
}

export default function PastTripSummaryModal({ visible, trip, onDismiss }: Props) {
  const theme = useTheme();
  const { settings } = useAppStore();
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    if (visible && trip) {
      budgetRepo.getExpensesForTrip(trip.id).then(setExpenses);
    } else {
      setExpenses([]);
    }
  }, [visible, trip]);

  if (!trip) return null;

  const homeCountry = settings?.homeCountry;
  const homeCurrency = settings?.homeCurrency || (homeCountry ? COUNTRIES.find((c: any) => c.code === homeCountry || c.name === homeCountry)?.currencyCode : null) || 'USD';
  
  const budgetNum = trip.budget || 0;
  const budgetType = trip.budgetType || 'trip';
  const trackCurrency = trip.trackCurrency || 'local';
  const localCurrency = COUNTRIES.find(c => c.name === trip.destinationCountry)?.currencyCode || 'USD';
  
  const tripDays = trip.startDate && trip.endDate ? 
    Math.max(1, Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))) 
    : 1;

  const totalTripBudget = budgetType === 'trip' ? budgetNum : budgetNum * tripDays;
  const totalSpentDisplay = expenses.reduce((sum, e) => sum + (trackCurrency === 'home' ? (e.convertedAmount || 0) : e.localAmount), 0);
  
  const displayCurrency = trackCurrency === 'home' ? homeCurrency : localCurrency;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
            {trip.destinationCountry} Summary
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>CONFIGURED BUDGET</Text>
            <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
              {totalTripBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrency}
            </Text>
            {budgetType === 'daily' && (
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                ({budgetNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrency} / day for {tripDays} days)
              </Text>
            )}
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.primaryContainer, marginTop: 16 }]}>
            <Text variant="labelMedium" style={{ color: theme.colors.onPrimaryContainer, marginBottom: 8 }}>USED BUDGET</Text>
            <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.onPrimaryContainer }}>
              {totalSpentDisplay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrency}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onPrimaryContainer }}>
              {totalTripBudget > 0 
                ? (totalSpentDisplay <= totalTripBudget ? 'Under budget!' : 'Over budget')
                : 'No budget limit set'}
            </Text>
          </View>

          <View style={{ marginTop: 24 }}>
            <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 8, color: theme.colors.onSurface }}>Expenses ({expenses.length})</Text>
            {expenses.length === 0 ? (
              <Text style={{ color: theme.colors.onSurfaceVariant }}>No expenses recorded for this trip.</Text>
            ) : (
              expenses.map((exp, idx) => (
                <View key={exp.id}>
                  <List.Item
                    title={exp.title}
                    description={new Date(exp.date).toLocaleDateString()}
                    right={() => (
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
                          {(trackCurrency === 'home' ? (exp.convertedAmount || 0) : exp.localAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {displayCurrency}
                        </Text>
                      </View>
                    )}
                  />
                  {idx < expenses.length - 1 && <Divider />}
                </View>
              ))
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button mode="contained" onPress={onDismiss}>Close</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
  },
  card: {
    padding: 16,
    borderRadius: 12,
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
});
