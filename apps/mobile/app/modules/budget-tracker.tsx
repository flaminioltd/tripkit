import ModuleHeader from '../../src/components/app-header/ModuleHeader';
import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '../../src/lib/countries';
import { FLAG_IMAGES } from '../../src/lib/assets';
import { useTripStore } from '../../src/stores/trip-store';
import { useAppStore } from '../../src/stores/app-store';
import { View, Image, StyleSheet, SafeAreaView, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import { Text, Card, useTheme, IconButton, FAB, Avatar, Portal, Dialog, TextInput, SegmentedButtons, ProgressBar, Switch } from 'react-native-paper';
import Button from '../../src/components/ui/Button';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { db } from '../../src/db/client';
import { exchangeRates, countries, settings as dbSettings } from '../../src/db/schema';
import { eq } from 'drizzle-orm';

const CATEGORIES = [
  { value: 'food', icon: 'silverware-fork-knife', label: 'Food' },
  { value: 'flights', icon: 'airplane', label: 'Flights' },
  { value: 'transport', icon: 'train', label: 'Transport' },
  { value: 'shopping', icon: 'shopping', label: 'Shopping' },
  { value: 'entertainment', icon: 'ticket', label: 'Fun' },
  { value: 'accommodation', icon: 'bed', label: 'Hotel' },
  { value: 'other', icon: 'dots-horizontal', label: 'Other' },
];

const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$', 'CAD': 'C$',
  'CHF': 'CHF', 'CNY': '¥', 'SEK': 'kr', 'NZD': 'NZ$', 'MXN': '$', 'SGD': 'S$',
  'HKD': 'HK$', 'NOK': 'kr', 'KRW': '₩', 'TRY': '₺', 'INR': '₹', 'BRL': 'R$',
  'ZAR': 'R', 'RUB': '₽', 'THB': '฿', 'PLN': 'zł', 'IDR': 'Rp', 'CZK': 'Kč',
  'ILS': '₪', 'VND': '₫', 'DKK': 'kr', 'HUF': 'Ft', 'RON': 'lei', 'ARS': '$'
};

export default function BudgetTrackerScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { activeTrip, expenses, updateTrip, addExpense, updateExpense, removeExpense } = useTripStore();
  
  const activeCountryCode = activeTrip ? COUNTRIES.find((c: any) => c.name === activeTrip.destinationCountry)?.code : null;
  const [activeCountry, setActiveCountry] = useState<any>(null);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [homeCurrencyState, setHomeCurrencyState] = useState<string>('USD');

  const localCurrency = activeCountry?.currencyCode || 'USD';

  // Settings states
  const [budgetAmount, setBudgetAmount] = useState(activeTrip?.budget?.toString() || '');
  const [budgetType, setBudgetType] = useState(activeTrip?.budgetType || 'trip');
  const [trackCurrency, setTrackCurrency] = useState(activeTrip?.trackCurrency || 'local');
  const [loadedTripId, setLoadedTripId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'total' | 'daily'>('total');

  const tripDays = activeTrip?.startDate && activeTrip?.endDate ? 
    Math.max(1, Math.ceil((new Date(activeTrip.endDate).getTime() - new Date(activeTrip.startDate).getTime()) / (1000 * 60 * 60 * 24))) 
    : 1;

  const handleBudgetTypeChange = (newType: string) => {
    if (newType === budgetType) return;
    const numAmount = parseFloat(budgetAmount) || 0;
    
    let newAmount = numAmount;
    if (newType === 'trip' && budgetType === 'daily') {
      newAmount = numAmount * tripDays;
    } else if (newType === 'daily' && budgetType === 'trip') {
      newAmount = numAmount / tripDays;
    }
    
    setBudgetAmount(newAmount > 0 ? newAmount.toFixed(2).replace(/\.00$/, '') : '');
    setBudgetType(newType);
  };

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCategory, setModalCategory] = useState('food');
  const [modalAmount, setModalAmount] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        if (!activeTrip) return;
        try {
          // Load settings from DB for accurate home currency
          const settingsRes = await db.select().from(dbSettings).limit(1);
          if (settingsRes.length > 0) {
            let hc = settingsRes[0].homeCurrency;
            if (!hc && settingsRes[0].homeCountry) {
              const countryObj = COUNTRIES.find((c: any) => c.code === settingsRes[0].homeCountry || c.name === settingsRes[0].homeCountry);
              if (countryObj) hc = countryObj.currencyCode;
            }
            if (hc) setHomeCurrencyState(hc);
          }

          const targetCountryName = activeTrip.destinationCountry;
          const countryRes = await db.select().from(countries).where(eq(countries.name, targetCountryName)).limit(1);
          if (countryRes.length > 0) setActiveCountry(countryRes[0]);

          const ratesRes = await db.select().from(exchangeRates);
          const ratesMap: Record<string, number> = {};
          ratesRes.forEach(r => ratesMap[r.currencyCode] = r.rate);
          setRates(ratesMap);

          // Restore state from trip if available only on first load for this trip
          if (loadedTripId !== activeTrip.id) {
            setBudgetAmount(activeTrip.budget?.toString() || '');
            setBudgetType(activeTrip.budgetType || 'trip');
            setTrackCurrency(activeTrip.trackCurrency || 'local');
            setLoadedTripId(activeTrip.id);
          }
        } catch (e) {
          console.error("Failed to load data:", e);
        }
      }
      loadData();
    }, [activeTrip?.id]) // Run when trip ID changes, not on every object mutation
  );

  // Auto-save settings when they change
  useEffect(() => {
    if (activeTrip && loadedTripId === activeTrip.id) {
      updateTrip(activeTrip.id, {
        budget: parseFloat(budgetAmount.replace(/,/g, '')) || 0,
        budgetType,
        trackCurrency
      });
    }
  }, [budgetAmount, budgetType, trackCurrency]);

  const getConvertedAmount = (amount: number, fromCurrency: string, toCurrency: string) => {
    if (fromCurrency === toCurrency) return amount;
    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;
    // Base is USD. amount in USD = amount / fromRate. amount in toCurrency = (amount / fromRate) * toRate
    return (amount / fromRate) * toRate;
  };

  const handleSaveExpense = async () => {
    if (!activeTrip || !modalAmount) return;
    
    const amountNum = parseFloat(modalAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    // The user inputs the amount in the tracked currency
    let localAmt = 0;
    let convertedAmt = 0;

    if (trackCurrency === 'home') {
      convertedAmt = amountNum;
      localAmt = getConvertedAmount(amountNum, homeCurrencyState, localCurrency);
    } else {
      localAmt = amountNum;
      convertedAmt = getConvertedAmount(amountNum, localCurrency, homeCurrencyState);
    }

    const selectedCategoryObj = CATEGORIES.find(c => c.value === modalCategory);
    const defaultTitle = selectedCategoryObj ? selectedCategoryObj.label : 'Expense';
    const finalTitle = modalTitle.trim() || defaultTitle;

    if (editingExpenseId) {
      await updateExpense(editingExpenseId, {
        title: finalTitle,
        category: modalCategory,
        localAmount: localAmt,
        convertedAmount: convertedAmt,
      });
    } else {
      await addExpense({
        tripId: activeTrip.id,
        title: finalTitle,
        category: modalCategory,
        localAmount: localAmt,
        convertedAmount: convertedAmt,
        date: new Date(),
      });
    }
    
    setIsModalVisible(false);
  };

  const openAddModal = () => {
    setEditingExpenseId(null);
    setModalCategory('food');
    setModalTitle('');
    setModalAmount('');
    setIsModalVisible(true);
  };

  const openEditModal = (expense: any) => {
    setEditingExpenseId(expense.id);
    setModalCategory(expense.category);
    setModalTitle(expense.title);
    const amt = trackCurrency === 'home' ? (expense.convertedAmount || expense.localAmount) : expense.localAmount;
    setModalAmount(amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setIsModalVisible(true);
  };

  // Calculations
  const displayCurrency = trackCurrency === 'home' ? homeCurrencyState : localCurrency;
  const displaySymbol = CURRENCY_SYMBOLS[displayCurrency] || displayCurrency;
  
  const totalSpentDisplay = expenses.reduce((sum, e) => sum + (trackCurrency === 'home' ? (e.convertedAmount || 0) : e.localAmount), 0);

  const getProgressColor = (progress: number) => {
    if (progress < 0.5) return '#4CAF50'; // Green
    if (progress < 0.7) return '#FF9800'; // Light Orange
    if (progress < 0.9) return '#F57C00'; // Dark Orange
    return '#F44336'; // Red
  };

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const spentTodayDisplay = expenses
    .filter(e => new Date(e.date).getTime() >= todayStart.getTime())
    .reduce((sum, e) => sum + (trackCurrency === 'home' ? (e.convertedAmount || 0) : e.localAmount), 0);

  const budgetNum = parseFloat(budgetAmount) || 0;

  let totalTripBudget = budgetType === 'trip' ? budgetNum : budgetNum * tripDays;
  let todayBudgetLimit = budgetType === 'trip' ? (budgetNum / tripDays) : budgetNum;

  const totalProgress = totalTripBudget > 0 ? Math.min(1, totalSpentDisplay / totalTripBudget) : 0;
  const todayProgress = todayBudgetLimit > 0 ? Math.min(1, spentTodayDisplay / todayBudgetLimit) : 0;

  const handleReset = () => {
    Alert.alert(
      t("modules.budgetTracker.resetBudgetAlertTitle", "Reset Budget & Expenses"),
      t("modules.budgetTracker.resetBudgetAlertMessage", "Are you sure you want to reset your budget to 0 and delete all expenses? This cannot be undone."),
      [
        { text: t("modules.budgetTracker.cancelButton", "Cancel"), style: "cancel" },
        {
          text: t("modules.budgetTracker.resetButton", "Reset"),
          style: "destructive",
          onPress: async () => {
            setBudgetAmount('');
            if (expenses.length > 0) {
              for (const e of expenses) {
                await removeExpense(e.id);
              }
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ModuleHeader title={t("modules.budgetTracker.headerTitle", "Budget Tracker")} />

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Card style={styles.settingsCard} mode="outlined">
              <Card.Content>
                <View style={{ marginBottom: 12 }}>
                  <Text variant="labelMedium" style={{ marginBottom: 4 }}>{t("modules.budgetTracker.trackIn", "Track Expenses In")}</Text>
                  <SegmentedButtons
                    value={trackCurrency}
                    onValueChange={setTrackCurrency}
                    buttons={[
                      { value: 'home', label: `${t('modules.budgetTracker.homeCurrency', 'Home')} (${homeCurrencyState})` },
                      { value: 'local', label: `${t('modules.budgetTracker.localCurrency', 'Local')} (${localCurrency})` },
                    ]}
                  />
                </View>

                <View style={styles.settingRow}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text variant="labelMedium" style={{ marginBottom: 4 }}>{t("modules.budgetTracker.budgetLimit", "Budget Amount")}</Text>
                    <TextInput
                      value={budgetAmount}
                      onChangeText={setBudgetAmount}
                      keyboardType="numeric"
                      mode="outlined"
                      left={<TextInput.Affix text={displaySymbol} />}
                      style={{ backgroundColor: theme.colors.surface, height: 40 }}
                    />
                  </View>
                  <View style={{ flex: 1.15, paddingLeft: 8 }}>
                    <Text variant="labelMedium" style={{ marginBottom: 4 }}>{t("modules.budgetTracker.budgetType", "Budget Scope")}</Text>
                    <SegmentedButtons
                      value={budgetType}
                      onValueChange={handleBudgetTypeChange}
                      buttons={[
                        { value: 'daily', label: t('modules.budgetTracker.dailyBudget', 'Daily') },
                        { value: 'trip', label: t('modules.budgetTracker.totalTripBudget', 'Trip') },
                      ]}
                      style={{ height: 40 }}
                    />
                  </View>
                </View>
              </Card.Content>
            </Card>

            <Card style={[styles.summaryCard, { backgroundColor: theme.colors.primaryContainer }]} mode="contained">
              <Card.Content>
                <View>
                  <View style={styles.progressHeader}>
                    <Text variant="titleMedium" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>
                      {viewMode === 'total' ? t('modules.budgetTracker.totalSpent', 'Total Spent') : t('modules.budgetTracker.spentToday', 'Spent Today')}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, marginRight: 8, color: viewMode === 'daily' ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant, fontWeight: viewMode === 'daily' ? 'bold' : 'normal' }}>{t('modules.budgetTracker.dailyBudget', 'Daily')}</Text>
                      <Switch 
                        value={viewMode === 'total'} 
                        onValueChange={(val) => setViewMode(val ? 'total' : 'daily')} 
                        color={theme.colors.primary}
                      />
                      <Text style={{ fontSize: 14, marginLeft: 8, color: viewMode === 'total' ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant, fontWeight: viewMode === 'total' ? 'bold' : 'normal' }}>{t('modules.budgetTracker.totalTripBudget', 'Trip')}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
                    <Text variant="titleMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                      {displaySymbol}{(viewMode === 'total' ? totalSpentDisplay : spentTodayDisplay).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                      {budgetNum > 0 && (
                        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                          {' '}/ {displaySymbol}{(viewMode === 'total' ? totalTripBudget : todayBudgetLimit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                      )}
                    </Text>
                  </View>
                  <ProgressBar 
                    progress={viewMode === 'total' ? totalProgress : todayProgress} 
                    color={getProgressColor(viewMode === 'total' ? totalProgress : todayProgress)} 
                    style={styles.progressBar} 
                  />
                  <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8, textAlign: 'right' }}>
                    {t('modules.budgetTracker.remaining', 'Remaining:')} {budgetNum > 0 ? `${displaySymbol}${((viewMode === 'total' ? totalTripBudget : todayBudgetLimit) - (viewMode === 'total' ? totalSpentDisplay : spentTodayDisplay)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                  </Text>
                </View>
              </Card.Content>
            </Card>

            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>{t('modules.budgetTracker.expensesTitle', 'Recent Expenses')}</Text>
              <Button mode="text" onPress={openAddModal} compact>{t('modules.budgetTracker.addExpenseButton', '+ Add New')}</Button>
            </View>
            {expenses.length === 0 && (
              <View style={styles.emptyState}>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>{t('modules.budgetTracker.noExpensesLabel', 'No expenses added yet.')}</Text>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => {
          const categoryObj = CATEGORIES.find(c => c.value === item.category) || CATEGORIES[0];
          const displayAmt = trackCurrency === 'home' ? (item.convertedAmount || 0) : item.localAmount;
          const secondaryAmt = trackCurrency === 'home' ? item.localAmount : (item.convertedAmount || 0);
          const secondarySymbol = trackCurrency === 'home' ? CURRENCY_SYMBOLS[localCurrency] : CURRENCY_SYMBOLS[homeCurrencyState];

          return (
            <Card style={styles.entryCard} mode="contained" onPress={() => openEditModal(item)}>
              <Card.Title 
                title={item.title} 
                subtitle={new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })} 
                left={(props) => <Avatar.Icon {...props} icon={categoryObj.icon} size={40} style={{ backgroundColor: theme.colors.surfaceVariant }} />}
                right={(props) => (
                  <View style={styles.amountContainer}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{displaySymbol}{displayAmt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{secondarySymbol || ''}{secondaryAmt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  </View>
                )}
              />
            </Card>
          );
        }}
        ListFooterComponent={
          <View style={{ padding: 16, alignItems: 'center', marginTop: 8, marginBottom: 64 }}>
            <Button 
              mode="text" 
              textColor={theme.colors.error} 
              icon="delete-sweep"
              onPress={handleReset}
            >
              Reset Budget & Clear Expenses
            </Button>
          </View>
        }
      />

      <Portal>
        <Dialog visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} style={{ backgroundColor: theme.colors.surface }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
            <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>
              {editingExpenseId ? t('modules.budgetTracker.expenseModalTitleEdit', 'Edit Expense') : t('modules.budgetTracker.expenseModalTitleAdd', 'Add Expense')}
            </Text>
            {editingExpenseId && (
              <IconButton 
                icon="delete-outline" 
                iconColor={theme.colors.error} 
                size={24} 
                onPress={async () => {
                  await removeExpense(editingExpenseId);
                  setIsModalVisible(false);
                }}
                style={{ margin: 0 }}
              />
            )}
          </View>
          <Dialog.Content>
            <Text variant="labelMedium" style={{ marginBottom: 8 }}>{t("modules.budgetTracker.categoryLabel", "Category")}</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat.value}
                  onPress={() => setModalCategory(cat.value)}
                  style={[
                    styles.categoryChip,
                    {
                      borderColor: modalCategory === cat.value ? theme.colors.primary : theme.colors.outline,
                      backgroundColor: modalCategory === cat.value ? theme.colors.primaryContainer : 'transparent',
                    }
                  ]}
                >
                  <IconButton icon={cat.icon} size={16} style={{ margin: 0, width: 16, height: 16 }} />
                  <Text style={{ color: modalCategory === cat.value ? theme.colors.onPrimaryContainer : theme.colors.onSurface, fontSize: 12 }}>
                    {t(`categories.${cat.value}`, cat.label)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              label={t("modules.budgetTracker.detailsOptional", "Description (Optional)")}
              value={modalTitle}
              onChangeText={setModalTitle}
              mode="outlined"
              style={{ marginBottom: 12, backgroundColor: theme.colors.surface }}
            />

            <TextInput
              label={t("modules.budgetTracker.amountLocal", "Amount ({{currency}})", { currency: displayCurrency })}
              value={modalAmount}
              onChangeText={setModalAmount}
              keyboardType="numeric"
              mode="outlined"
              style={{ backgroundColor: theme.colors.surface }}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: 'column', gap: 12, alignItems: 'center', paddingBottom: 24, paddingHorizontal: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="alternative" style={{ width: 125 }} onPress={() => setIsModalVisible(false)}>{t('modules.budgetTracker.cancelButton', 'Cancel')}</Button>
              <Button variant="main" style={{ width: 125 }} onPress={handleSaveExpense}>{t('modules.budgetTracker.saveExpenseButton', 'Save')}</Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16, borderBottomWidth: 1 },
  content: { padding: 16 },
  settingsCard: { marginBottom: 16, backgroundColor: '#ffffff' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryCard: { elevation: 0, marginBottom: 24 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  progressBar: { height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.1)' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  emptyState: { padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: 12, marginBottom: 16 },
  entryCard: { marginBottom: 8, backgroundColor: '#ffffff' },
  amountContainer: { alignItems: 'flex-end', paddingRight: 16, justifyContent: 'center' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  categoryChip: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 16, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }
});
