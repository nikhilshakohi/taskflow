import { create } from "zustand";

interface AppState {
  nav: string | null;
  setNav: (val: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  nav: null,
  setNav: (nav) => set({ nav }),
}));
