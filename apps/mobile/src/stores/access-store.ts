import { create } from 'zustand';

// Simple trial logic for now. 
// A robust implementation would store the first launch date in AsyncStorage or SecureStore.
interface AccessState {
  isPremium: boolean;
  trialStartedAt: Date | null;
  isTrialActive: boolean;
  
  unlockPremium: () => void;
  startTrial: () => void;
  checkAccess: () => void;
}

export const useAccessStore = create<AccessState>((set, get) => ({
  isPremium: false,
  trialStartedAt: null,
  isTrialActive: false,

  unlockPremium: () => {
    set({ isPremium: true });
  },

  startTrial: () => {
    const now = new Date();
    set({ trialStartedAt: now, isTrialActive: true });
  },

  checkAccess: () => {
    const { isPremium, trialStartedAt } = get();
    if (isPremium) return;

    if (trialStartedAt) {
      const now = new Date().getTime();
      const trialEnd = trialStartedAt.getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days
      set({ isTrialActive: now < trialEnd });
    }
  }
}));
