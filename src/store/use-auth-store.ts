import { create } from 'zustand';
import type { User, UserTier } from '@shared/types';
import { api } from '@/lib/api-client';
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, tier?: UserTier) => Promise<void>;
  logout: () => void;
  updateTier: (tier: UserTier) => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, name = 'Executive User', tier = 'Free') => {
    try {
      const userData = await api<User>('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, name, tier })
      });
      set({ user: userData, isAuthenticated: true });
    } catch (err) {
      console.error('Auth sync failed', err);
      // Fallback for offline/error
      set({ 
        user: { id: 'temp', email, name, tier }, 
        isAuthenticated: true 
      });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateTier: (tier) => set((state) => ({
    user: state.user ? { ...state.user, tier } : null
  })),
}));