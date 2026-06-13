import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, useTheme, Modal, Portal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStore } from '../stores/app-store';

import { useTranslation } from 'react-i18next';

interface ChangeLanguageModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
];

export default function ChangeLanguageModal({ visible, onDismiss }: ChangeLanguageModalProps) {
  const theme = useTheme();
  const { updateSettings, settings } = useAppStore();
  const { i18n } = useTranslation();

  const handleSelectLanguage = async (code: string) => {
    await updateSettings({ systemLanguage: code });
    i18n.changeLanguage(code);
    onDismiss();
  };

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>System Language</Text>
          <Pressable onPress={onDismiss} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color={theme.colors.onSurfaceVariant} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={[styles.dropdown, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outlineVariant }]}>
            <ScrollView bounces={false}>
              {LANGUAGES.map((item) => {
                const isSelected = settings?.systemLanguage === item.code || (!settings?.systemLanguage && item.code === 'en');
                return (
                  <Pressable 
                    key={item.code}
                    style={({ pressed }) => [
                      styles.resultItem,
                      pressed && { backgroundColor: theme.colors.surfaceVariant }
                    ]}
                    onPress={() => handleSelectLanguage(item.code)}
                  >
                    <View style={[styles.resultIcon, { backgroundColor: theme.colors.surfaceVariant }]}>
                      <MaterialIcons name="language" size={20} color={isSelected ? theme.colors.primary : theme.colors.onSurfaceVariant} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyLarge" style={{ color: isSelected ? theme.colors.primary : theme.colors.onSurface, fontWeight: isSelected ? 'bold' : '500' }}>
                        {item.name}
                      </Text>
                    </View>
                    {isSelected && (
                      <MaterialIcons name="check" size={20} color={theme.colors.primary} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
    maxHeight: '60%',
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
    paddingBottom: 24,
  },
  dropdown: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
