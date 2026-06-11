import ModuleHeader from '../../src/components/app-header/ModuleHeader';
import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '../../src/lib/countries';
import { FLAG_IMAGES } from '../../src/lib/assets';
import { useTripStore } from '../../src/stores/trip-store';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput as NativeTextInput } from 'react-native';
import { Text, TextInput, Card, Button, useTheme, IconButton, Divider, SegmentedButtons } from 'react-native-paper';
import { useRouter, useFocusEffect } from 'expo-router';
import { compareAtmAndExchange } from '@tripkit/shared';
import { db } from '../../src/db/client';
import { exchangeRates, settings as dbSettings, countries } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$', 'CAD': 'C$',
  'CHF': 'CHF', 'CNY': '¥', 'SEK': 'kr', 'NZD': 'NZ$', 'MXN': '$', 'SGD': 'S$',
  'HKD': 'HK$', 'NOK': 'kr', 'KRW': '₩', 'TRY': '₺', 'INR': '₹', 'BRL': 'R$',
  'ZAR': 'R', 'RUB': '₽', 'THB': '฿', 'PLN': 'zł', 'IDR': 'Rp', 'CZK': 'Kč',
  'ILS': '₪', 'VND': '₫', 'DKK': 'kr', 'HUF': 'Ft', 'RON': 'lei', 'ARS': '$'
};

export default function AtmExchangeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { activeTrip } = useTripStore();
  
  const activeCountryCode = activeTrip ? COUNTRIES.find((c: any) => c.name === activeTrip.destinationCountry)?.code : null;
  const activeCountryData = COUNTRIES.find((c: any) => c.name === activeTrip?.destinationCountry);
  
  const [homeCurrencyCode, setHomeCurrencyCode] = useState('USD');
  const [localCurrencyCode, setLocalCurrencyCode] = useState(activeCountryData?.currencyCode || 'EUR');
  const [midMarketRate, setMidMarketRate] = useState('1.10');

  // Base State
  const [baseAmount, setBaseAmount] = useState('0');
  const [baseCurrencyType, setBaseCurrencyType] = useState('local');

  // ATM State
  const [atmLocalFeeLocal, setAtmLocalFeeLocal] = useState('0');
  const [atmHomeBankFxFeePercentage, setAtmHomeBankFxFeePercentage] = useState('0');
  const [atmHomeBankFlatFeeHome, setAtmHomeBankFlatFeeHome] = useState('0');

  // Exchange Bureau State
  const [exchangeBureauRate, setExchangeBureauRate] = useState('1.10');
  const [exchangeBureauFee, setExchangeBureauFee] = useState('0');
  const [exchangeBureauFeeCurrency, setExchangeBureauFeeCurrency] = useState('local');
  const [rateDirection, setRateDirection] = useState<'homeToLocal' | 'localToHome'>('homeToLocal');

  const handleSwapRateDirection = () => {
    setRateDirection(prev => prev === 'homeToLocal' ? 'localToHome' : 'homeToLocal');
    const mid = parseFloat(midMarketRate);
    if (mid > 0) setMidMarketRate((1 / mid).toFixed(4));
    
    const bureau = parseFloat(exchangeBureauRate);
    if (bureau > 0) setExchangeBureauRate((1 / bureau).toFixed(4));
  };

  useFocusEffect(
    React.useCallback(() => {
      async function loadRatesAndCurrencies() {
        try {
          const settingsRes = await db.select().from(dbSettings).limit(1);
          let hc = 'USD';
          if (settingsRes.length > 0) {
            hc = settingsRes[0].homeCurrency || 'USD';
            if (!settingsRes[0].homeCurrency && settingsRes[0].homeCountry) {
              // Try by code or name
              let cObj = await db.select().from(countries).where(eq(countries.code, settingsRes[0].homeCountry)).limit(1);
              if (cObj.length === 0) {
                cObj = await db.select().from(countries).where(eq(countries.name, settingsRes[0].homeCountry)).limit(1);
              }
              if (cObj.length > 0) {
                hc = cObj[0].currencyCode;
              }
            }
          }
          setHomeCurrencyCode(hc);

          let lc = 'EUR';
          if (activeTrip?.destinationCountry) {
            const destCountryRes = await db.select().from(countries).where(eq(countries.name, activeTrip.destinationCountry)).limit(1);
            if (destCountryRes.length > 0) {
              lc = destCountryRes[0].currencyCode;
            }
          }
          setLocalCurrencyCode(lc);

          if (hc !== lc) {
            const ratesRes = await db.select().from(exchangeRates);
            const ratesMap: Record<string, number> = {};
            ratesRes.forEach((r: any) => ratesMap[r.currencyCode] = r.rate);
            
            // USD is base. 1 USD = fromRate LC, 1 USD = toRate HC.
            const rateLc = ratesMap[lc] || 1;
            const rateHc = ratesMap[hc] || 1;
            
            // We need 1 Home = X Local => Rate = rateLc / rateHc
            const currentMidRate = rateLc / rateHc;
            setRateDirection('homeToLocal');
            const formattedMid = currentMidRate.toFixed(4);
            setMidMarketRate(formattedMid);
            setExchangeBureauRate(formattedMid);
          } else {
            setMidMarketRate('1.0000');
            setExchangeBureauRate('1.0000');
          }
        } catch (error) {
          console.error('Failed to load currency data:', error);
        }
      }
      loadRatesAndCurrencies();
    }, [activeTrip?.destinationCountry])
  );

  const handleReset = () => {
    setBaseAmount('0');
    setBaseCurrencyType('local');
    setAtmLocalFeeLocal('0');
    setAtmHomeBankFxFeePercentage('0');
    setAtmHomeBankFlatFeeHome('0');
    setRateDirection('homeToLocal');
    setExchangeBureauRate(midMarketRate);
    setExchangeBureauFee('0');
    setExchangeBureauFeeCurrency('local');
  };

  const homeSymbol = CURRENCY_SYMBOLS[homeCurrencyCode] || homeCurrencyCode;
  const localSymbol = CURRENCY_SYMBOLS[localCurrencyCode] || localCurrencyCode;

  const leftCurrency = rateDirection === 'homeToLocal' ? homeSymbol : localSymbol;
  const rightCurrency = rateDirection === 'homeToLocal' ? localSymbol : homeSymbol;

  const actualMidMarketRate = rateDirection === 'homeToLocal' 
    ? parseFloat(midMarketRate) || 0 
    : (parseFloat(midMarketRate) > 0 ? 1 / parseFloat(midMarketRate) : 0);

  const actualBureauRate = rateDirection === 'homeToLocal' 
    ? parseFloat(exchangeBureauRate) || 0 
    : (parseFloat(exchangeBureauRate) > 0 ? 1 / parseFloat(exchangeBureauRate) : 0);

  const result = compareAtmAndExchange({
    baseAmount: parseFloat(baseAmount) || 0,
    baseCurrencyType: baseCurrencyType as 'home' | 'local',
    midMarketRate: actualMidMarketRate,
    atmLocalFeeLocal: parseFloat(atmLocalFeeLocal) || 0,
    atmHomeBankFxFeePercentage: parseFloat(atmHomeBankFxFeePercentage) || 0,
    atmHomeBankFlatFeeHome: parseFloat(atmHomeBankFlatFeeHome) || 0,
    exchangeBureauRate: actualBureauRate,
    exchangeBureauFee: parseFloat(exchangeBureauFee) || 0,
    exchangeBureauFeeCurrency: exchangeBureauFeeCurrency as 'home' | 'local' | 'percentage',
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ModuleHeader title="ATM & Exchange" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
          Compare ATM withdrawals against local Exchange Bureaus.
        </Text>

        {/* Base Configuration */}
        <Card style={styles.card} mode="contained">
          <Card.Content>
            <Text variant="labelLarge" style={{ marginBottom: 8, color: theme.colors.onSurfaceVariant }}>Target Amount</Text>
            <SegmentedButtons
              value={baseCurrencyType}
              onValueChange={setBaseCurrencyType}
              buttons={[
                { value: 'home', label: `Home (${homeSymbol})` },
                { value: 'local', label: `Local (${localSymbol})` },
              ]}
              style={{ marginBottom: 12 }}
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Amount ({baseCurrencyType === 'home' ? homeSymbol : localSymbol})</Text>
                <TextInput 
                  value={baseAmount} 
                  onChangeText={setBaseAmount} 
                  keyboardType="numeric" 
                  mode="outlined" 
                  style={[styles.input, { height: 48, marginBottom: 4 }]} 
                />
              </View>
              <View style={{ flex: 1.2 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Market Rate</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 4, borderWidth: 1, borderColor: theme.colors.outline, paddingLeft: 12, paddingRight: 4, backgroundColor: theme.colors.surfaceVariant, marginBottom: 4 }}>
                  <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, opacity: 0.5 }}>1 {leftCurrency} = </Text>
                  <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>{midMarketRate}</Text>
                  <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, opacity: 0.5 }}> {rightCurrency}</Text>
                  <View style={{ flex: 1 }} />
                  <IconButton icon="swap-vertical" size={20} onPress={handleSwapRateDirection} style={{ margin: 0 }} />
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Option A: ATM */}
        <Card style={styles.card} mode="contained">
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Option A: ATM Withdrawal</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Local Fee</Text>
                <TextInput 
                  value={atmLocalFeeLocal} 
                  onChangeText={setAtmLocalFeeLocal} 
                  keyboardType="numeric" 
                  mode="outlined" 
                  style={[styles.input, { height: 48, marginBottom: 4 }]} 
                />
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontSize: 10 }}>in {localSymbol}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Bank Flat Fee</Text>
                <TextInput 
                  value={atmHomeBankFlatFeeHome} 
                  onChangeText={setAtmHomeBankFlatFeeHome} 
                  keyboardType="numeric" 
                  mode="outlined" 
                  style={[styles.input, { height: 48, marginBottom: 4 }]} 
                />
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, fontSize: 10 }}>in {homeSymbol}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Bank FX %</Text>
                <TextInput 
                  value={atmHomeBankFxFeePercentage} 
                  onChangeText={setAtmHomeBankFxFeePercentage} 
                  keyboardType="numeric" 
                  mode="outlined" 
                  style={[styles.input, { height: 48, marginBottom: 4 }]} 
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Option B: Exchange Bureau */}
        <Card style={styles.card} mode="contained">
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 12, fontWeight: 'bold' }}>Option B: Cash Exchange</Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
              <View style={{ flex: 1.2 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Bureau Rate</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 48, borderRadius: 4, borderWidth: 1, borderColor: theme.colors.outline, paddingLeft: 12, paddingRight: 4, backgroundColor: theme.colors.surface, marginBottom: 8 }}>
                  <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, opacity: 0.5 }}>1 {leftCurrency} = </Text>
                  <NativeTextInput 
                    value={exchangeBureauRate}
                    onChangeText={setExchangeBureauRate}
                    keyboardType="numeric"
                    style={{ color: theme.colors.onSurface, fontSize: 14, padding: 0, margin: 0, minWidth: 20 }}
                  />
                  <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, opacity: 0.5 }}> {rightCurrency}</Text>
                  <View style={{ flex: 1 }} />
                  <IconButton icon="swap-vertical" size={20} onPress={handleSwapRateDirection} style={{ margin: 0 }} />
                </View>
                <Slider
                  style={{ width: '100%', height: 32 }}
                  minimumValue={(parseFloat(midMarketRate) || 1) * 0.7}
                  maximumValue={parseFloat(midMarketRate) || 1}
                  step={0.0001}
                  value={parseFloat(exchangeBureauRate) || parseFloat(midMarketRate) || 1}
                  onValueChange={(val) => setExchangeBureauRate(val.toFixed(4))}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor={theme.colors.surfaceVariant}
                  thumbTintColor={theme.colors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, marginBottom: 4, marginLeft: 4 }}>Bureau Fee</Text>
                <TextInput 
                  value={exchangeBureauFee} 
                  onChangeText={setExchangeBureauFee} 
                  keyboardType="numeric" 
                  mode="outlined" 
                  style={[styles.input, { height: 48, marginBottom: 8 }]} 
                />
                <View style={{ flexDirection: 'row', height: 32, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.outline, overflow: 'hidden' }}>
                  <Pressable 
                    onPress={() => setExchangeBureauFeeCurrency('home')}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: exchangeBureauFeeCurrency === 'home' ? theme.colors.secondaryContainer : 'transparent' }}
                  >
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 12, color: exchangeBureauFeeCurrency === 'home' ? theme.colors.onSecondaryContainer : theme.colors.onSurface, paddingHorizontal: 2 }}>{homeSymbol}</Text>
                  </Pressable>
                  <View style={{ width: 1, backgroundColor: theme.colors.outline }} />
                  <Pressable 
                    onPress={() => setExchangeBureauFeeCurrency('local')}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: exchangeBureauFeeCurrency === 'local' ? theme.colors.secondaryContainer : 'transparent' }}
                  >
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 12, color: exchangeBureauFeeCurrency === 'local' ? theme.colors.onSecondaryContainer : theme.colors.onSurface, paddingHorizontal: 2 }}>{localSymbol}</Text>
                  </Pressable>
                  <View style={{ width: 1, backgroundColor: theme.colors.outline }} />
                  <Pressable 
                    onPress={() => setExchangeBureauFeeCurrency('percentage')}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: exchangeBureauFeeCurrency === 'percentage' ? theme.colors.secondaryContainer : 'transparent' }}
                  >
                    <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 12, color: exchangeBureauFeeCurrency === 'percentage' ? theme.colors.onSecondaryContainer : theme.colors.onSurface, paddingHorizontal: 2 }}>%</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Results */}
        <Card style={[styles.resultCard, { backgroundColor: theme.colors.primaryContainer }]} mode="contained">
          <Card.Content style={styles.resultContent}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
              {/* ATM Column */}
              <View style={{ flex: 1 }}>
                <Text variant="titleSmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8, fontWeight: 'bold' }}>ATM</Text>
                
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Cost</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 2 }}>{homeSymbol}{result.atmHomeCost.toFixed(2)}</Text>
                
                <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, opacity: 0.6, marginBottom: 8 }}>
                  Effective Rate: {result.atmEffectiveRate.toFixed(4)}
                </Text>
                
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Receive</Text>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{localSymbol}{result.atmLocalReceived.toFixed(2)}</Text>
              </View>

              <View style={{ width: 1, backgroundColor: theme.colors.outlineVariant || theme.colors.outline }} />

              {/* Bureau Column */}
              <View style={{ flex: 1 }}>
                <Text variant="titleSmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8, fontWeight: 'bold' }}>Exchange Bureau</Text>
                
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Cost</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold', marginBottom: 2 }}>{homeSymbol}{result.bureauHomeCost.toFixed(2)}</Text>
                
                <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, opacity: 0.6, marginBottom: 8 }}>
                  Effective Rate: {result.bureauEffectiveRate.toFixed(4)}
                </Text>
                
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Receive</Text>
                <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{localSymbol}{result.bureauLocalReceived.toFixed(2)}</Text>
              </View>
            </View>

            <Divider style={styles.divider} />
            
            <View style={styles.recommendationContainer}>
              <Text variant="titleMedium" style={{ color: theme.colors.primary, textAlign: 'center', fontWeight: 'bold' }}>
                Recommendation: {result.recommendation}
              </Text>
              {result.recommendation !== 'Equal' && (
                <Text variant="bodyMedium" style={{ color: theme.colors.primary, textAlign: 'center', marginTop: 4 }}>
                  {baseCurrencyType === 'local' 
                    ? `Saves you ${homeSymbol}${result.differenceHome.toFixed(2)}`
                    : `Gives you ${localSymbol}${result.differenceLocal.toFixed(2)} more`}
                </Text>
              )}
            </View>
            
          </Card.Content>
        </Card>
        <View style={{ marginTop: 8, marginBottom: 24, paddingHorizontal: 16 }}>
          <Button mode="outlined" onPress={handleReset} style={{ borderColor: theme.colors.outline }}>
            Reset Values
          </Button>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16, borderBottomWidth: 1 },
  content: { padding: 16 },
  card: { backgroundColor: '#ffffff', marginBottom: 24 },
  input: { backgroundColor: '#ffffff', marginBottom: 12 },
  divider: { marginVertical: 12 },
  resultCard: { elevation: 0 },
  resultContent: { gap: 8 },
  resultSection: { marginVertical: 4 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recommendationContainer: { marginVertical: 8, padding: 8, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8 }
});
