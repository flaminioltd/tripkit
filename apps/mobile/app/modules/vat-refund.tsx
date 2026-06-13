import Button from '../../src/components/ui/Button';
import ModuleHeader from '../../src/components/app-header/ModuleHeader';
import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '../../src/lib/countries';
import { FLAG_IMAGES } from '../../src/lib/assets';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Text, TextInput, Card, useTheme, IconButton, Portal, Dialog, SegmentedButtons } from 'react-native-paper';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTripStore } from '../../src/stores/trip-store';
import { db } from '../../src/db/client';
import { countries, vatPurchases, expenses, exchangeRates, settings as dbSettings } from '../../src/db/schema';
import { eq } from 'drizzle-orm';
import * as Crypto from 'expo-crypto';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$', 'CAD': 'C$',
  'CHF': 'CHF', 'CNY': '¥', 'SEK': 'kr', 'NZD': 'NZ$', 'MXN': '$', 'SGD': 'S$',
  'HKD': 'HK$', 'NOK': 'kr', 'KRW': '₩', 'TRY': '₺', 'INR': '₹', 'BRL': 'R$',
  'ZAR': 'R', 'RUB': '₽', 'THB': '฿', 'PLN': 'zł', 'IDR': 'Rp', 'CZK': 'Kč',
  'ILS': '₪', 'VND': '₫', 'DKK': 'kr', 'HUF': 'Ft', 'RON': 'lei', 'ARS': '$'
};

const CATEGORIES = [
  { value: 'clothes', icon: 'tshirt-crew', label: t('modules.vatRefund.catClothes', 'Clothes') },
  { value: 'electronics', icon: 'cellphone', label: t('modules.vatRefund.catElectronics', 'Electronics') },
  { value: 'jewelry', icon: 'ring', label: t('modules.vatRefund.catJewelry', 'Jewelry') },
  { value: 'accessories', icon: 'glasses', label: t('modules.vatRefund.catAccessories', 'Accessories') },
  { value: 'gifts', icon: 'gift', label: t('modules.vatRefund.catGifts', 'Gifts') },
  { value: 'other', icon: 'dots-horizontal', label: t('modules.vatRefund.catOther', 'Other') },
];

export default function VatRefundScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { activeTrip, addExpense } = useTripStore();
  const activeCountryCode = activeTrip ? COUNTRIES.find((c: any) => c.name === activeTrip.destinationCountry)?.code : null;
  
  const [activeCountry, setActiveCountry] = useState<any>(null);
  const [syncSuccess, setSyncSuccess] = useState(false);
  
  // VAT and Admin fee states
  const [vatRate, setVatRate] = useState('0');
  const [isEditingVatRate, setIsEditingVatRate] = useState(false);
  const [adminFee, setAdminFee] = useState('5');
  const [isEditingAdminFee, setIsEditingAdminFee] = useState(false);
  
  // Purchases list
  const [purchases, setPurchases] = useState<any[]>([]);
  
  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPurchaseId, setEditingPurchaseId] = useState<string | null>(null);
  const [modalCategory, setModalCategory] = useState('clothes');
  const [modalDetails, setModalDetails] = useState('');
  const [modalAmount, setModalAmount] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        if (!activeTrip) return;

        try {
          // Load active country and default VAT
          const targetCountryName = activeTrip.destinationCountry;
          const countryRes = await db.select().from(countries).where(eq(countries.name, targetCountryName)).limit(1);
          if (countryRes.length > 0) {
            setActiveCountry(countryRes[0]);
            if (!isEditingVatRate && vatRate === '0') {
               setVatRate((countryRes[0].vatRate || 0).toString());
            }
          }

          // Load purchases
          const purchasesRes = await db.select().from(vatPurchases).where(eq(vatPurchases.tripId, activeTrip.id));
          setPurchases(purchasesRes);
        } catch (e) {
          console.error("Failed to load VAT data:", e);
        }
      }
      loadData();
    }, [activeTrip])
  );

  const currencyCode = activeCountry ? activeCountry.currencyCode : 'USD';
  const currencySymbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;

  const handleSavePurchase = async () => {
    if (!activeTrip || !modalAmount) return;

    try {
      const amountNum = parseFloat(modalAmount);
      if (isNaN(amountNum) || amountNum <= 0) return;

      if (editingPurchaseId) {
        // Update existing
        const updated = {
          iconCategory: modalCategory,
          details: modalDetails,
          amount: amountNum,
        };
        await db.update(vatPurchases).set(updated).where(eq(vatPurchases.id, editingPurchaseId));
        
        setPurchases(prev => prev.map(p => p.id === editingPurchaseId ? { ...p, ...updated } : p));
      } else {
        // Insert new
        const newPurchase = {
          id: Crypto.randomUUID(),
          tripId: activeTrip.id,
          iconCategory: modalCategory,
          details: modalDetails,
          amount: amountNum,
          createdAt: new Date(),
        };
        await db.insert(vatPurchases).values(newPurchase);
        setPurchases(prev => [...prev, newPurchase]);
      }
      
      setIsModalVisible(false);
    } catch (e) {
      console.error("Failed to save VAT purchase:", e);
    }
  };

  const handleRemovePurchase = async (id: string) => {
    try {
      await db.delete(vatPurchases).where(eq(vatPurchases.id, id));
      setPurchases(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error("Failed to delete purchase:", e);
    }
  };

  const openAddModal = () => {
    setEditingPurchaseId(null);
    setModalCategory('clothes');
    setModalDetails('');
    setModalAmount('');
    setIsModalVisible(true);
  };

  const openEditModal = (purchase: any) => {
    setEditingPurchaseId(purchase.id);
    setModalCategory(purchase.iconCategory);
    setModalDetails(purchase.details || '');
    setModalAmount(purchase.amount.toString());
    setIsModalVisible(true);
  };

  // Calculations
  const grandTotal = purchases.reduce((sum, p) => sum + p.amount, 0);
  const vatRateNum = parseFloat(vatRate) || 0;
  const adminFeeNum = parseFloat(adminFee) || 0;

  // Effective refund rate = (VAT Rate / (100 + VAT Rate)) * 100
  const baseRefundRate = vatRateNum > 0 ? (vatRateNum / (100 + vatRateNum)) * 100 : 0;
  const effectiveRefundRate = Math.max(0, baseRefundRate - adminFeeNum);
  const estimatedRefund = grandTotal * (effectiveRefundRate / 100);

  const handleSync = async () => {
    const finalAmount = Math.max(0, grandTotal - estimatedRefund);
    if (!activeTrip || finalAmount <= 0) return;
    try {
      const settingsRes = await db.select().from(dbSettings).limit(1);
      let hc = 'USD';
      if (settingsRes.length > 0) {
        hc = settingsRes[0].homeCurrency || 'USD';
        if (!settingsRes[0].homeCurrency && settingsRes[0].homeCountry) {
          const cObj = COUNTRIES.find((c: any) => c.code === settingsRes[0].homeCountry || c.name === settingsRes[0].homeCountry);
          if (cObj) hc = cObj.currencyCode;
        }
      }
      
      const localCurrency = activeCountry?.currencyCode || 'USD';
      let convertedAmt = finalAmount;

      if (hc !== localCurrency) {
         const ratesRes = await db.select().from(exchangeRates);
         const ratesMap: Record<string, number> = {};
         ratesRes.forEach(r => ratesMap[r.currencyCode] = r.rate);
         
         const fromRate = ratesMap[localCurrency] || 1;
         const toRate = ratesMap[hc] || 1;
         convertedAmt = (finalAmount / fromRate) * toRate;
      }

      await addExpense({
        tripId: activeTrip.id,
        title: t('modules.vatRefund.expenseTitle', 'Shopping (VAT Refund Applied)'),
        category: 'shopping',
        localAmount: finalAmount,
        convertedAmount: convertedAmt,
        date: new Date()
      });
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to sync to budget tracker', e);
    }
  };

  const handleReset = async () => {
    if (activeTrip) {
      await db.delete(vatPurchases).where(eq(vatPurchases.tripId, activeTrip.id));
    }
    setPurchases([]);
    setAdminFee('5');
    setIsEditingAdminFee(false);
    
    if (activeCountry) {
      setVatRate((activeCountry.vatRate || 0).toString());
    } else {
      setVatRate('0');
    }
    setIsEditingVatRate(false);
    setSyncSuccess(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ModuleHeader title={t("modules.vatRefund.headerTitle", "VAT Refund")} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
          {t("modules.vatRefund.estimateDesc", "Estimate your tax-free shopping refund for {{country}}.", { country: activeCountry ? activeCountry.name : t("modules.vatRefund.yourDestination", "your destination") })}
        </Text>

        <Card style={styles.card} mode="contained">
          <Card.Content>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <Text variant="labelMedium" style={{ marginBottom: 8 }}>{t("modules.vatRefund.standardVat", "Standard VAT Rate")}</Text>
                <TextInput
                  value={vatRate}
                  onChangeText={setVatRate}
                  keyboardType="numeric"
                  mode="outlined"
                  disabled={!isEditingVatRate}
                  style={{ backgroundColor: '#ffffff', marginBottom: 8 }}
                  right={<TextInput.Affix text="%" />}
                />
                <Button 
                  mode={isEditingVatRate ? "contained" : "outlined"} 
                  onPress={() => setIsEditingVatRate(!isEditingVatRate)}
                >
                  {isEditingVatRate ? t("modules.vatRefund.setButton", "Set") : t("modules.vatRefund.adjustButton", "Adjust")}
                </Button>
              </View>

              <View style={{ flex: 1 }}>
                <Text variant="labelMedium" style={{ marginBottom: 8 }}>{t("modules.vatRefund.adminFee", "Estimated Admin Fee")}</Text>
                <TextInput
                  value={adminFee}
                  onChangeText={setAdminFee}
                  keyboardType="numeric"
                  mode="outlined"
                  disabled={!isEditingAdminFee}
                  style={{ backgroundColor: '#ffffff', marginBottom: 8 }}
                  right={<TextInput.Affix text="%" />}
                />
                <Button 
                  mode={isEditingAdminFee ? "contained" : "outlined"} 
                  onPress={() => setIsEditingAdminFee(!isEditingAdminFee)}
                >
                  {isEditingAdminFee ? t("modules.vatRefund.setButton", "Set") : t("modules.vatRefund.adjustButton", "Adjust")}
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{t("modules.vatRefund.purchases", "Purchases")}</Text>
          <Button mode="text" onPress={openAddModal}>{t("modules.vatRefund.addNew", "+ Add New")}</Button>
        </View>

        {purchases.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>{t("modules.vatRefund.noPurchases", "No purchases added yet.")}</Text>
          </View>
        ) : (
          purchases.map(p => {
            const categoryObj = CATEGORIES.find(c => c.value === p.iconCategory) || CATEGORIES[0];
            return (
              <Card key={p.id} style={styles.purchaseCard} mode="elevated">
                <View style={styles.purchaseRow}>
                  <View style={[styles.iconBox, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <IconButton icon={categoryObj.icon} size={24} iconColor={theme.colors.onSurfaceVariant} />
                  </View>
                  <View style={styles.purchaseInfo}>
                    <Text variant="titleMedium">{t(`modules.vatRefund.cat${categoryObj.label}`, categoryObj.label)}</Text>
                    {p.details ? <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{p.details}</Text> : null}
                  </View>
                  <View style={styles.purchaseAmount}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{currencySymbol}{p.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  </View>
                  <View style={styles.purchaseActions}>
                    <IconButton icon="pencil" size={20} onPress={() => openEditModal(p)} style={{ margin: 0 }} />
                    <IconButton icon="delete" size={20} iconColor={theme.colors.error} onPress={() => handleRemovePurchase(p.id)} style={{ margin: 0 }} />
                  </View>
                </View>
              </Card>
            );
          })
        )}

        <View style={styles.grandTotalRow}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>{t("modules.vatRefund.grandTotal", "Grand Total")}</Text>
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{currencySymbol}{grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>

        <Card style={[styles.resultCard, { backgroundColor: theme.colors.primaryContainer }]} mode="contained">
          <Card.Content style={styles.resultContent}>
            <View style={styles.resultRow}>
              <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>{t("modules.vatRefund.estimatedRefund", "Estimated Refund")}</Text>
              <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                {currencySymbol}{estimatedRefund > 0 ? estimatedRefund.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>{t("modules.vatRefund.effectiveRefundRate", "Effective Refund Rate")}</Text>
              <Text variant="titleMedium" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
                {effectiveRefundRate > 0 ? effectiveRefundRate.toFixed(1) : '0.0'}%
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <Button mode="contained" onPress={handleSync} style={{ flex: 1 }} disabled={syncSuccess || purchases.length === 0}>
            {syncSuccess ? t("modules.tipCalculator.synced", "Synced!") : t("modules.tipCalculator.syncToBudget", "Sync to Budget")}
          </Button>
          <Button mode="outlined" onPress={handleReset} style={{ flex: 1 }}>
            Reset
          </Button>
        </View>

        {syncSuccess && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
            <MaterialIcons name="check-circle" size={20} color={theme.colors.primary} />
            <Text style={{ marginLeft: 6, color: theme.colors.primary, fontWeight: '500' }}>{t("modules.tipCalculator.addedToExpenses", "Added to Expenses")}</Text>
          </View>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} style={{ backgroundColor: theme.colors.surface }}>
          <Dialog.Title>{editingPurchaseId ? t('modules.vatRefund.editPurchase', 'Edit Purchase') : t('modules.vatRefund.addPurchase', 'Add New Purchase')}</Dialog.Title>
          <Dialog.Content>
            <Text variant="labelMedium" style={{ marginBottom: 8 }}>{t("modules.vatRefund.category", "Category")}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat.value}
                  onPress={() => setModalCategory(cat.value)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: modalCategory === cat.value ? theme.colors.primary : theme.colors.outline,
                    backgroundColor: modalCategory === cat.value ? theme.colors.primaryContainer : 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <IconButton icon={cat.icon} size={16} style={{ margin: 0, padding: 0, width: 16, height: 16 }} />
                  <Text style={{ color: modalCategory === cat.value ? theme.colors.onPrimaryContainer : theme.colors.onSurface }}>
                    {t(`modules.vatRefund.cat${cat.label}`, cat.label)}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              label={t("modules.vatRefund.detailsOptional", "Details (Optional)")}
              value={modalDetails}
              onChangeText={setModalDetails}
              mode="outlined"
              style={{ marginBottom: 12, backgroundColor: theme.colors.surface }}
            />

            <TextInput
              label={t("modules.vatRefund.purchaseAmountLabel", "Purchase Amount (in {{symbol}})", { symbol: currencySymbol })}
              value={modalAmount}
              onChangeText={setModalAmount}
              keyboardType="numeric"
              mode="outlined"
              style={{ backgroundColor: theme.colors.surface }}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 16, justifyContent: 'center', paddingBottom: 16 }}>
            <Button variant="alternative" style={{ width: 130 }} onPress={() => setIsModalVisible(false)}>{t("modules.tipCalculator.cancel", "Cancel")}</Button>
            <Button variant="main" style={{ width: 130 }} onPress={handleSavePurchase}>{t("modules.vatRefund.save", "Save")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16, borderBottomWidth: 1 },
  content: { padding: 16, paddingBottom: 48 },
  card: { backgroundColor: '#ffffff', marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  emptyState: { padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: 12, marginBottom: 16 },
  purchaseCard: { marginBottom: 12, backgroundColor: '#ffffff' },
  purchaseRow: { flexDirection: 'row', alignItems: 'center', padding: 8, paddingRight: 0 },
  iconBox: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  purchaseInfo: { flex: 1 },
  purchaseAmount: { marginRight: 8 },
  purchaseActions: { flexDirection: 'row' },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0', marginBottom: 24 },
  resultCard: { elevation: 0, marginBottom: 16 },
  resultContent: { gap: 12 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
