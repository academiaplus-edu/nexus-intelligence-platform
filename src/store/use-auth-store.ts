import { create } from 'zustand';
export type UserTier = 'Free' | 'Academic' | 'Industry' | 'Enterprise';
export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, tier?: UserTier) => void;
  logout: () => void;
  updateTier: (tier: UserTier) => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email, name = 'Executive User', tier = 'Free') => 
    set({ 
      user: { id: crypto.randomUUID(), email, name, tier }, 
      isAuthenticated: true 
    }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateTier: (tier) => set((state) => ({
    user: state.user ? { ...state.user, tier } : null
  })),
}));