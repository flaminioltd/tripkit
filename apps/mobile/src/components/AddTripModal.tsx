import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, FlatList, Pressable, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { Text, Button, useTheme, TextInput as PaperInput, Modal, Portal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { FLAG_IMAGES } from '../lib/assets';
import { useTripStore } from '../stores/trip-store';
import { db } from '../db/client';
import { countries } from '../db/schema';

interface AddTripModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AddTripModal({ visible, onDismiss }: AddTripModalProps) {
  const theme = useTheme();
  const { createTrip } = useTripStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [notSetYet, setNotSetYet] = useState(false);
  const [allCountries, setAllCountries] = useState<any[]>([]);

  const [tempStart, setTempStart] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<any>({});

  const handleDayPress = (day: any) => {
    if (!tempStart) {
      setTempStart(day.dateString);
      setMarkedDates({
        [day.dateString]: { startingDay: true, endingDay: true, color: theme.colors.primary, textColor: 'white' }
      });
      setStartDate(new Date(day.timestamp));
      setEndDate(null);
    } else {
      const start = new Date(tempStart);
      const end = new Date(day.timestamp);
      if (end < start) {
        setTempStart(day.dateString);
        setMarkedDates({
          [day.dateString]: { startingDay: true, endingDay: true, color: theme.colors.primary, textColor: 'white' }
        });
        setStartDate(new Date(day.timestamp));
        setEndDate(null);
      } else {
        const range: any = {};
        let current = new Date(start);
        while (current <= end) {
          const dateString = current.toISOString().split('T')[0];
          if (current.getTime() === start.getTime()) {
            range[dateString] = { startingDay: true, color: theme.colors.primary, textColor: 'white' };
          } else if (current.getTime() === end.getTime()) {
            range[dateString] = { endingDay: true, color: theme.colors.primary, textColor: 'white' };
          } else {
            range[dateString] = { color: theme.colors.primaryContainer, textColor: theme.colors.onPrimaryContainer };
          }
          current.setDate(current.getDate() + 1);
        }
        setMarkedDates(range);
        setStartDate(start);
        setEndDate(end);
        setTempStart(null);
        setTimeout(() => setShowPicker(false), 300);
      }
    }
  };

  useEffect(() => {
    db.select().from(countries).then(res => setAllCountries(res));
  }, []);

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setSearchQuery('');
      setSelectedCountry(null);
      setStartDate(null);
      setEndDate(null);
      setNotSetYet(false);
      setIsFocused(false);
      setShowPicker(false);
      setTempStart(null);
      setMarkedDates({});
    }
  }, [visible]);

  const filteredCountries = useMemo(() => {
    const list = searchQuery 
      ? allCountries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : allCountries;
    return list.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, allCountries]);

  const handleCreate = async () => {
    if (selectedCountry) {
      await createTrip({
        destinationCountry: selectedCountry.name,
        startDate: notSetYet ? null : startDate,
        endDate: notSetYet ? null : endDate,
        budget: 1000,
        currency: 'USD'
      });
      onDismiss();
    }
  };

  const handleSelectCountry = (country: any) => {
    setSelectedCountry(country);
    setSearchQuery(country.name);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.background }]}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardView} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>Plan New Trip</Text>
            <Pressable onPress={onDismiss} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={theme.colors.onSurfaceVariant} />
            </Pressable>
          </View>

          <View style={styles.content}>
            <View style={styles.searchArea}>
              <View style={[
                styles.searchContainer, 
                { 
                  backgroundColor: theme.colors.surface,
                  borderColor: isFocused ? theme.colors.primary : theme.colors.outlineVariant,
                  borderWidth: isFocused ? 2 : 1
                }
              ]}>
                <MaterialIcons name="search" size={24} color={theme.colors.primary} style={styles.searchIcon} />
                <PaperInput
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                    setSelectedCountry(null);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter a country..."
                  style={styles.input}
                  underlineStyle={{ display: 'none' }}
                  textColor={theme.colors.onSurface}
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={() => {
                    setSearchQuery('');
                    setSelectedCountry(null);
                  }} style={styles.clearIcon}>
                    <MaterialIcons name="close" size={20} color={theme.colors.onSurfaceVariant} />
                  </Pressable>
                )}
              </View>

            </View>

            {isFocused && (
              <View style={[styles.dropdown, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}>
                <FlatList
                  data={filteredCountries}
                  keyExtractor={(item) => item.code}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled={true}
                  renderItem={({ item }) => (
                    <Pressable 
                      style={({ pressed }) => [
                        styles.resultItem,
                        pressed && { backgroundColor: theme.colors.surfaceVariant }
                      ]}
                      onPress={() => handleSelectCountry(item)}
                    >
                      {FLAG_IMAGES[item.code] ? (
                        <Image source={FLAG_IMAGES[item.code]} style={{ width: 36, height: 36, marginRight: 16, borderRadius: 18 }} />
                      ) : (
                        <View style={[styles.resultIcon, { backgroundColor: theme.colors.surfaceVariant }]}>
                          <MaterialIcons name="location-on" size={20} color={theme.colors.onSurfaceVariant} />
                        </View>
                      )}
                      <View style={{ flex: 1 }}>
                        <Text variant="bodyLarge" style={{ color: theme.colors.onSurface, fontWeight: '500' }}>
                          {item.name}
                        </Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                          {item.region}
                        </Text>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            )}

            <View style={styles.datesSection}>
              <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Trip Dates</Text>
              
              <Pressable 
                 style={[styles.dateButton, { borderColor: theme.colors.outlineVariant, backgroundColor: notSetYet ? theme.colors.surfaceVariant : 'transparent' }]}
                 onPress={() => setNotSetYet(!notSetYet)}
              >
                <MaterialIcons name={notSetYet ? 'check-circle' : 'radio-button-unchecked'} size={24} color={theme.colors.primary} />
                <Text style={{ marginLeft: 8, color: theme.colors.onSurface }}>Not Set Yet</Text>
              </Pressable>

              <View style={{ marginTop: 8 }}>
                <Button 
                  mode="outlined" 
                  onPress={() => setShowPicker(true)} 
                  icon="calendar-range"
                  disabled={notSetYet}
                  style={{ borderColor: theme.colors.outlineVariant, opacity: notSetYet ? 0.5 : 1 }}
                  labelStyle={{ paddingVertical: 4 }}
                >
                  {startDate && endDate 
                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : 'Select Date Range'}
                </Button>
              </View>

                <Portal>
                  <Modal visible={showPicker} onDismiss={() => setShowPicker(false)} contentContainerStyle={{ margin: 24, borderRadius: 16, overflow: 'hidden', backgroundColor: theme.colors.surface }}>
                    <Calendar
                      markingType={'period'}
                      markedDates={markedDates}
                      onDayPress={handleDayPress}
                      theme={{
                        todayTextColor: theme.colors.primary,
                        arrowColor: theme.colors.primary,
                      }}
                    />
                  </Modal>
                </Portal>
              </View>
            </View>

          <View style={styles.footer}>
            <Button 
              mode="contained" 
              onPress={handleCreate} 
              disabled={!selectedCountry || (!notSetYet && (!startDate || !endDate))}
              style={styles.button}
              contentStyle={{ height: 56 }}
              labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
            >
              Create Trip
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  keyboardView: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 24,
  },
  searchArea: {
    position: 'relative',
    zIndex: 10,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 56,
  },
  clearIcon: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 64,
    left: 24,
    right: 24,
    maxHeight: 250,
    zIndex: 100,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  datesSection: {
    marginTop: 16,
    paddingBottom: 24,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  datePickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
  button: {
    borderRadius: 28,
  },
});
