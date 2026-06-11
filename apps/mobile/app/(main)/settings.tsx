import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, useTheme, Button, List } from 'react-native-paper';
import { useAppStore } from '../../src/stores/app-store';
import { COUNTRIES } from '../../src/lib/countries';
import { FLAG_IMAGES } from '../../src/lib/assets';
import ChangeHomeCountryModal from '../../src/components/ChangeHomeCountryModal';
import ChangeLanguageModal from '../../src/components/ChangeLanguageModal';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const theme = useTheme();
  const { settings } = useAppStore();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const { i18n } = useTranslation();

  const homeCountry = COUNTRIES.find(c => c.code === settings?.homeCountry);
  const currentLanguageCode = settings?.systemLanguage || i18n.language.split('-')[0] || 'en';
  const LANGUAGES: Record<string, string> = { en: 'English', es: 'Spanish', de: 'German' };
  const currentLanguageName = LANGUAGES[currentLanguageCode] || 'English';

  const handleSync = async () => {
    console.log("Trigger Sync");
    // TODO: Wire up actual sync
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, alignSelf: 'flex-start', marginBottom: 8 }}>
        Settings
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, alignSelf: 'flex-start', marginBottom: 24 }}>
        Manage app preferences and data synchronization.
      </Text>

      <View style={[styles.section, { backgroundColor: theme.colors.surfaceVariant, borderRadius: 16 }]}>
        <List.Item
          title="Home Country"
          description={homeCountry ? homeCountry.name : 'Not set'}
          left={props => (
            homeCountry && FLAG_IMAGES[homeCountry.code] ? 
              <Image source={FLAG_IMAGES[homeCountry.code]} style={{ width: 32, height: 32, borderRadius: 16, margin: 8 }} />
              : <List.Icon {...props} icon="earth" />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => setCountryModalVisible(true)}
        />
        <List.Item
          title="System Language"
          description={currentLanguageName}
          left={props => <List.Icon {...props} icon="translate" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => setLanguageModalVisible(true)}
        />
      </View>

      <View style={{ marginTop: 'auto', width: '100%', alignItems: 'center' }}>
        <Button mode="contained" onPress={handleSync} icon="sync">
          Force Sync Offline Data
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
