import { Redirect } from 'expo-router';
import { useAppStore } from '../src/stores/app-store';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { settings, loadSettings } = useAppStore();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then(() => setHasLoaded(true));
  }, []);

  if (!hasLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6B9985" />
      </View>
    );
  }

  if (settings?.setupComplete) {
    return <Redirect href="/(main)" />;
  }

  return <Redirect href="/onboarding/welcome" />;
}
