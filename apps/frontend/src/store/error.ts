import { create } from "zustand";

export interface ErrorState {
  error: string | undefined;
  setError: (error: string) => void;
}

export const useError = create<ErrorState>((set) => ({
  error: undefined,
  setError: async (error: string) => {
    set({ error });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    set({ error: undefined });
  },
}));
