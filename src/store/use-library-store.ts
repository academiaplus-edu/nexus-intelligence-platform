import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface LibraryState {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}
export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      toggleSave: (id: string) => {
        const current = get().savedIds;
        const isSaved = current.includes(id);
        if (isSaved) {
          set({ savedIds: current.filter((i) => i !== id) });
        } else {
          set({ savedIds: [...current, id] });
        }
      },
      isSaved: (id: string) => get().savedIds.includes(id),
    }),
    {
      name: 'nexus-library-storage',
    }
  )
);