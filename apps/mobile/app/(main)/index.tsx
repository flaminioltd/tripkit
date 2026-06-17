import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme, Menu } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTripStore } from '../../src/stores/trip-store';
import { useAppStore } from '../../src/stores/app-store';
import { FLAG_IMAGES } from '../../src/lib/assets';
import AddTripModal from '../../src/components/AddTripModal';
import { useTranslation } from 'react-i18next';
import i18n from '../../src/i18n';

import { LinearGradient } from 'expo-linear-gradient';
import { FINANCE_MODULES, ESSENTIALS_MODULES, RedesignModuleProps } from '../../src/lib/modules';

import { COUNTRIES } from '../../src/lib/countries';

const formatDateRange = (start: Date | null | undefined, end: Date | null | undefined, tbdStr: string = 'TBD') => {
  if (!start || !end) return tbdStr;
  const s = new Date(start);
  const e = new Date(end);
  const locale = i18n.language || 'en-US';
  return `${s.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} — ${e.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
};

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { trips, activeTrip, setActiveTrip, loadTrips } = useTripStore();
  const { loadSettings } = useAppStore();
  const { t } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeCountryCode, setActiveCountryCode] = useState<string | null>(null);
  const [isAddTripVisible, setAddTripVisible] = useState(false);

  useEffect(() => {
    loadTrips();
    loadSettings();
  }, []);

  useEffect(() => {
    if (activeTrip) {
      const country = COUNTRIES.find(c => c.name === activeTrip.destinationCountry);
      if (country) {
        setActiveCountryCode(country.code);
      }
    } else {
      setActiveCountryCode(null);
    }
  }, [activeTrip]);

  const today = new Date();
  today.setHours(0,0,0,0);

  const isPastTrip = (t: any) => {
    if (!t.endDate) return false;
    const e = new Date(t.endDate);
    e.setHours(0,0,0,0);
    return e < today;
  };

  const upcomingTrips = trips.filter(t => !isPastTrip(t)).sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  const pastTrips = trips.filter(t => isPastTrip(t)).sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    // Sort past trips descending (most recent past trip first)
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const renderModuleCard = (mod: RedesignModuleProps, idx: number) => {
    const isFullWidth = mod.colSpan === 2;
    return (
      <Pressable
        key={idx}
        onPress={() => router.push(mod.route as any)}
        style={({ pressed }) => [
          { width: isFullWidth ? '100%' : '50%', paddingHorizontal: 1, marginBottom: 2 },
          pressed && styles.cardPressed
        ]}
      >
        <View
          style={[
            styles.redesignCard,
            { 
              backgroundColor: mod.backgroundColor,
              minHeight: 140,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
            }
          ]}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text style={{ 
              fontSize: 11, 
              fontFamily: 'DMSans_400Regular',
              fontWeight: 'normal', 
              color: 'rgba(0,0,0,0.4)', 
              textTransform: 'capitalize', 
              letterSpacing: 0.5,
              flex: 1,
              paddingRight: 8,
              paddingTop: 4
            }}>
              {t(`categories.${mod.category}`, mod.category)}
            </Text>
            
            <View style={{ marginRight: -4, marginTop: -4 }}>
              {mod.CustomIcon ? (
                <mod.CustomIcon size={48} color={mod.color} />
              ) : (
                <MaterialIcons name={mod.fallbackIcon} size={48} color={mod.color} />
              )}
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingLeft: 8, paddingBottom: 8 }}>
            <Text 
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
              style={{ 
                fontSize: 18,
                fontFamily: 'DMSans_400Regular',
                fontWeight: 'normal', 
                color: 'rgba(0,0,0,0.7)', 
                textAlign: 'left',
                lineHeight: 22
              }}
            >
              {t(`homeScreen.modules.${mod.id}.title`, mod.title).replace(' ', '\n')}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
        
        {/* Active Trip Strip */}
        <View style={[styles.tripStripContainer, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 14, marginTop: 12, gap: 12 }]}>
          <Text style={{ fontSize: 13, fontFamily: 'DMSans_400Regular', fontWeight: 'normal', color: theme.colors.onSurfaceVariant, textTransform: 'capitalize', letterSpacing: 0.5 }}>
            {t('tripsScreen.activeTripLabel', 'Active Trip').toLowerCase()}:
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            contentStyle={{
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
              marginTop: 4,
              minWidth: 250,
            }}
            anchor={
              <Pressable 
                onPress={() => setMenuVisible(true)}
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  gap: 8, 
                  paddingHorizontal: 12, 
                  paddingVertical: 6, 
                  backgroundColor: theme.colors.surface, 
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: theme.colors.outlineVariant,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1
                }}
              >
                {activeCountryCode && FLAG_IMAGES[activeCountryCode] && (
                  <Image source={FLAG_IMAGES[activeCountryCode]} style={{ width: 20, height: 20, borderRadius: 10 }} />
                )}
                <Text style={{ fontSize: 14, fontWeight: '500', color: theme.colors.onSurface }}>
                  {activeTrip ? (() => {
                    const activeCode = COUNTRIES.find(c => c.name === activeTrip.destinationCountry)?.code;
                    return activeCode ? t(`countries.${activeCode}`, activeTrip.destinationCountry) : activeTrip.destinationCountry;
                  })() : 'No active trip'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={16} color={theme.colors.onSurfaceVariant} />
              </Pressable>
            }
          >
            {upcomingTrips.length === 0 && <Menu.Item title="No upcoming trips" disabled />}
            
            {upcomingTrips.length > 0 && upcomingTrips.map(trip => {
              const countryCode = COUNTRIES.find(c => c.name === trip.destinationCountry)?.code;
              return (
                <Pressable
                  key={trip.id}
                  onPress={() => {
                    setActiveTrip(trip.id);
                    setMenuVisible(false);
                  }}
                  style={({ pressed }) => [
                    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
                    pressed && { backgroundColor: theme.colors.surfaceVariant }
                  ]}
                >
                  <View style={[styles.flagPlaceholder, { marginRight: 16 }]}>
                    {countryCode && FLAG_IMAGES[countryCode] ? (
                      <Image source={FLAG_IMAGES[countryCode]} style={{ width: 24, height: 24, borderRadius: 12 }} />
                    ) : (
                      <Text style={styles.flagText}>{'🌍'}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', paddingRight: 8 }}>
                    <Text variant="bodyLarge" style={{ fontWeight: trip.id === activeTrip?.id ? 'bold' : 'normal' }}>
                      {(() => {
                        const code = COUNTRIES.find(c => c.name === trip.destinationCountry)?.code;
                        return code ? t(`countries.${code}`, trip.destinationCountry) : (trip.destinationCountry || 'Unknown Trip');
                      })()}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      {formatDateRange(trip.startDate, trip.endDate, t('tripsScreen.tbd', 'TBD'))}
                    </Text>
                  </View>
                  {trip.id === activeTrip?.id && (
                    <MaterialIcons name="check" size={24} color={theme.colors.primary} />
                  )}
                </Pressable>
              );
            })}

            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                setAddTripVisible(true);
              }}
              title={t('modals.addTrip.title', 'Plan New Trip')}
              leadingIcon="plus"
            />
          </Menu>
        </View>

        {/* Modules Grid */}
        <View style={{ marginBottom: 0 }}>
          <View style={styles.grid}>
            {[...FINANCE_MODULES, ...ESSENTIALS_MODULES].map((mod, idx) => renderModuleCard(mod, idx))}
          </View>
        </View>

      </ScrollView>

      <AddTripModal 
        visible={isAddTripVisible} 
        onDismiss={() => setAddTripVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 1,
  },
  tripStripContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tripStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  flagPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  flagText: {
    fontSize: 16,
  },
  tripText: {
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -1,
  },
  redesignCard: {
    borderRadius: 24,
    flex: 1,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});
