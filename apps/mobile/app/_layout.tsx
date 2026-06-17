import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../src/theme/paper-theme';
import { useEffect } from 'react';
import { en, registerTranslation } from 'react-native-paper-dates';
import NetInfo from '@react-native-community/netinfo';
import '../src/i18n';

registerTranslation('en', en);
import { seedDatabase } from '../src/db/seed';
import { updateExchangeRates, shouldUpdateRates } from '../src/services/exchangeRates';
import { useFonts, DMSans_900Black, DMSans_700Bold, DMSans_400Regular } from '@expo-google-fonts/dm-sans';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_900Black,
    DMSans_700Bold,
    DMSans_400Regular,
  });

  useEffect(() => {
    seedDatabase().catch(console.error);
    
    // Subscribe to network state changes to refresh exchange rates
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        shouldUpdateRates().then(shouldUpdate => {
          if (shouldUpdate) {
            updateExchangeRates().catch(console.error);
          }
        }).catch(console.error);
      }
    });

    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="modules" />
        <Stack.Screen name="access" />
      </Stack>
    </PaperProvider>
  );
}
