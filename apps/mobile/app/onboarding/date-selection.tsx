import Button from '../../src/components/ui/Button';
import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, FlatList, Pressable, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { Text, useTheme, TextInput as PaperInput, Card, List } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTripStore } from '../../src/stores/trip-store';
import { useAppStore } from '../../src/stores/app-store';
import { db } from '../../src/db/client';
import { countries, exchangeRates } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import { getExchangeRate } from '../../src/services/exchangeRates';
import { FLAG_IMAGES } from '../../src/lib/assets';

export default function DateSelectionScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createTrip } = useTripStore();
  const { updateSettings } = useAppStore();
  
  const { homeCountryCode = 'US' } = useLocalSearchParams<{ homeCountryCode: string }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<any | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [allCountries, setAllCountries] = useState<any[]>([]);

  // Dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);
  const [notSetYet, setNotSetYet] = useState(false);

  // Exchange Rate
  const [exchangeRateInfo, setExchangeRateInfo] = useState<{ rate: number, baseCurrency: string, targetCurrency: string, date: string } | null>(null);

  useEffect(() => {
    // Load countries from DB
    db.select().from(countries).then(res => setAllCountries(res));
  }, []);

  const filteredCountries = useMemo(() => {
    let list = allCountries;
    if (searchQuery) {
      list = allCountries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, allCountries]);

  const handleSelectCountry = async (country: any) => {
    setSelectedDestination(country);
    setSearchQuery(country.name);
    setIsFocused(false);
    Keyboard.dismiss();

    const homeCountry = allCountries.find(c => c.code === homeCountryCode);
    const homeCurrency = homeCountry?.currencyCode || 'USD';

    // Fetch exchange rate
    const destRateData = await getExchangeRate(country.currencyCode);
    const homeRateData = await getExchangeRate(homeCurrency);

    if (destRateData && homeRateData) {
      const conversionRate = homeRateData.rate / destRateData.rate;
      setExchangeRateInfo({
        rate: conversionRate,
        baseCurrency: homeCurrency,
        targetCurrency: country.currencyCode,
        date: new Date(destRateData.updatedAt).toLocaleDateString()
      });
    } else {
      setExchangeRateInfo(null);
    }
  };

  const handleSkip = async () => {
    await updateSettings({ setupComplete: true });
    router.replace('/(main)');
  };

  const handleContinue = async () => {
    if (selectedDestination) {
      await createTrip({
        destinationCountry: selectedDestination.name,
        startDate: notSetYet ? null : startDate,
        endDate: notSetYet ? null : endDate,
        budget: null,
        currency: selectedDestination.currencyCode,
      });
      await updateSettings({ setupComplete: true });
      router.replace('/(main)');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text variant="titleLarge" style={[styles.headerTitle, { color: theme.colors.primary }]}>Plan Trip</Text>
        <Button onPress={handleSkip}>Skip</Button>
      </View>

      <View style={styles.content}>
        {!selectedDestination ? (
          <>
            <View style={styles.heroText}>
              <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
                Where are you going?
              </Text>
            </View>

            <View style={[styles.searchArea, { flex: 1 }]}>
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
                    setSelectedDestination(null);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter destination..."
                  style={styles.input}
                  underlineStyle={{ display: 'none' }}
                  textColor={theme.colors.onSurface}
                />
              </View>

              {isFocused && (
                <View style={[styles.dropdown, { position: 'relative', top: 0, flex: 1, marginTop: 8, backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}>
                  <FlatList
                    data={filteredCountries}
                    keyExtractor={(item) => item.code}
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled={true}
                    style={{ flex: 1 }}
                    renderItem={({ item }) => (
                      <Pressable 
                        style={({ pressed }) => [
                          styles.resultItem,
                          pressed && { backgroundColor: theme.colors.surfaceVariant }
                        ]}
                        onPress={() => handleSelectCountry(item)}
                      >
                        {FLAG_IMAGES[item.code] ? (
                          <Image source={FLAG_IMAGES[item.code]} style={{ width: 36, height: 36, borderRadius: 18, marginRight: 16 }} />
                        ) : (
                          <View style={{ width: 36, height: 36, borderRadius: 18, marginRight: 16, backgroundColor: theme.colors.surfaceVariant, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="location-on" size={20} color={theme.colors.onSurfaceVariant} />
                          </View>
                        )}
                        <View>
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
            </View>
          </>
        ) : (
          <View style={styles.selectedContainer}>
             <Card style={styles.card} mode="contained">
                <Card.Content>
                  <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
                    {selectedDestination.name} Details
                  </Text>
                  <List.Item
                    title={`${selectedDestination.currencyCode} to ${exchangeRateInfo ? exchangeRateInfo.baseCurrency : 'Home Currency'}`}
                    description={exchangeRateInfo ? `1 ${exchangeRateInfo.targetCurrency} = ${exchangeRateInfo.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${exchangeRateInfo.baseCurrency} (as of ${exchangeRateInfo.date})` : 'Exchange rate offline'}
                    left={props => <List.Icon {...props} icon="cash" />}
                  />
                  <List.Item
                    title={selectedDestination.measurementSystem === 'metric' ? 'Metric System' : 'Imperial System'}
                    description="Local Measurement"
                    left={props => <List.Icon {...props} icon="ruler" />}
                  />
                </Card.Content>
             </Card>

             <View style={styles.datesSection}>
               <Text variant="titleMedium" style={{ marginBottom: 12 }}>When are you traveling?</Text>
               
               <Pressable 
                  style={[styles.dateButton, { borderColor: theme.colors.outlineVariant, backgroundColor: notSetYet ? theme.colors.surfaceVariant : 'transparent' }]}
                  onPress={() => setNotSetYet(!notSetYet)}
               >
                 <MaterialIcons name={notSetYet ? 'check-circle' : 'radio-button-unchecked'} size={24} color={theme.colors.primary} />
                 <Text style={{ marginLeft: 8, color: theme.colors.onSurface }}>Not Set Yet</Text>
               </Pressable>

               {!notSetYet && (
                 <View style={styles.datePickers}>
                   <Button mode="outlined" onPress={() => setShowPicker('start')} style={{ flex: 1, marginRight: 4 }}>
                     {startDate ? startDate.toLocaleDateString() : 'Start Date'}
                   </Button>
                   <Button mode="outlined" onPress={() => setShowPicker('end')} style={{ flex: 1, marginLeft: 4 }}>
                     {endDate ? endDate.toLocaleDateString() : 'End Date'}
                   </Button>
                 </View>
               )}

               {showPicker && (
                 <DateTimePicker
                    value={showPicker === 'start' ? (startDate || new Date()) : (endDate || new Date())}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowPicker(null);
                      if (date) {
                        if (showPicker === 'start') setStartDate(date);
                        else setEndDate(date);
                      }
                    }}
                 />
               )}
             </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleContinue} 
          disabled={!selectedDestination || (!notSetYet && (!startDate || !endDate))}
          style={styles.button}
          contentStyle={{ height: 56 }}
        >
          {selectedDestination ? 'Save Trip' : 'Continue'}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontWeight: 'bold' },
  content: { flex: 1, padding: 24 },
  heroText: { marginBottom: 32 },
  title: { fontWeight: 'bold', marginBottom: 8 },
  searchArea: { position: 'relative', zIndex: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, height: 56, paddingHorizontal: 12 },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, backgroundColor: 'transparent', height: 50 },
  dropdown: { position: 'absolute', top: 64, left: 0, right: 0, borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
  resultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 },
  selectedContainer: { flex: 1 },
  card: { marginBottom: 24, backgroundColor: '#ffffff' },
  cardTitle: { fontWeight: 'bold', marginBottom: 8 },
  datesSection: { marginTop: 16 },
  dateButton: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderRadius: 12, marginBottom: 16 },
  datePickers: { flexDirection: 'row', justifyContent: 'space-between' },
  footer: { padding: 24, paddingBottom: 40 },
  button: { borderRadius: 28 }
});
