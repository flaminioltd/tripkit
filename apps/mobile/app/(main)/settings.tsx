import Button from '../../src/components/ui/Button';
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, useTheme, List } from 'react-native-paper';
import { useAppStore } from '../../src/stores/app-store';
import { COUNTRIES } from '../../src/lib/countries';
import { FLAG_IMAGES } from '../../src/lib/assets';
import ChangeHomeCountryModal from '../../src/components/ChangeHomeCountryModal';
import ChangeLanguageModal from '../../src/components/ChangeLanguageModal';
import CustomizeCurrencyUnitsModal from '../../src/components/CustomizeCurrencyUnitsModal';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { settings } = useAppStore();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const homeCountry = COUNTRIES.find(c => c.code === settings?.homeCountry);
  const currentLanguageCode = settings?.systemLanguage || i18n.language.split('-')[0] || 'en';
  const LANGUAGES: Record<string, string> = { en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français', it: 'Italiano', pt: 'Português' };
  const currentLanguageName = LANGUAGES[currentLanguageCode] || 'English';

  const handleSync = async () => {
    console.log("Trigger Sync");
    // TODO: Wire up actual sync
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, alignSelf: 'flex-start', marginBottom: 8 }}>
        {t('settingsScreen.headerTitle')}
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, alignSelf: 'flex-start', marginBottom: 24 }}>
        {t('settingsScreen.headerSubtitle')}
      </Text>

      <View style={[styles.section, { backgroundColor: '#EFE7DC', borderRadius: 16 }]}>
        <List.Item
          title={t('settingsScreen.homeCountry')}
          description={homeCountry ? t(`countries.${homeCountry.code}`, homeCountry.name) : t('settingsScreen.notSet')}
          left={props => (
            homeCountry && FLAG_IMAGES[homeCountry.code] ? 
              <Image source={FLAG_IMAGES[homeCountry.code]} style={{ width: 32, height: 32, borderRadius: 16, margin: 8 }} />
              : <List.Icon {...props} icon="earth" />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => setCountryModalVisible(true)}
        />
        <List.Item
          title={t('settingsScreen.customizeCurrencyUnitsTitle', 'Customize Currency & Units')}
          description={`${settings?.homeCurrency || 'USD'} • ${settings?.sizeFormat === 'imperial' ? t('welcomeScreen.imperialSystem', 'Imperial') : t('welcomeScreen.metricSystem', 'Metric')}`}
          left={props => <List.Icon {...props} icon="tune" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => setCustomizeModalVisible(true)}
        />
        <List.Item
          title={t('settingsScreen.systemLanguage')}
          description={currentLanguageName}
          left={props => <List.Icon {...props} icon="translate" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => setLanguageModalVisible(true)}
        />
      </View>

      <View style={{ marginTop: 'auto', width: '100%', alignItems: 'center' }}>
        <Button mode="outlined" onPress={() => router.push('/onboarding/welcome')} style={{ marginBottom: 16 }}>
          Onboarding
        </Button>
        <Button variant="alternative" onPress={handleSync} icon="sync">
          {t('settingsScreen.forceSyncButton', 'Sync Online Data')}
        </Button>
      </View>

      <ChangeHomeCountryModal 
        visible={countryModalVisible} 
        onDismiss={() => setCountryModalVisible(false)} 
      />
      
      <ChangeLanguageModal
        visible={languageModalVisible}
        onDismiss={() => setLanguageModalVisible(false)}
      />
      
      <CustomizeCurrencyUnitsModal
        visible={customizeModalVisible}
        onDismiss={() => setCustomizeModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  }
});
