import { create } from 'zustand';
import { settingsRepo } from '../repositories/settings-repository';
import type { settings } from '../db/schema';

type Settings = typeof settings.$inferSelect;

interface AppState {
  settings: Settings | null;
  isLoading: boolean;
  isSyncing: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (data: Partial<typeof settings.$inferInsert>) => Promise<void>;
  setSyncing: (isSyncing: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  settings: null,
  isLoading: true,
  isSyncing: false,

  loadSettings: async () => {
    set({ isLoading: true });
    try {
      const data = await settingsRepo.getSettings();
      if (data) data.isPremium = true;
      set({ settings: data });
      if (data?.systemLanguage) {
        import('../i18n').then((i18n) => i18n.default.changeLanguage(data.systemLanguage!));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (data) => {
    try {
      const result = await settingsRepo.saveSettings(data);
      if (result && result.length > 0) {
        result[0].isPremium = true;
        set({ settings: result[0] });
        if (data.systemLanguage) {
          import('../i18n').then((i18n) => i18n.default.changeLanguage(data.systemLanguage!));
        }
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  },

  setSyncing: (isSyncing) => set({ isSyncing }),
}));
