// import { ZapData } from "@/lib/types";
import { ZapData } from "@/lib/types";
import { create } from "zustand";
import { useError } from "./error";

interface ZapState {
  zap: ZapData | null;
  fetchZap: (zapId: string) => Promise<void>;
  // createZap: (data: ZapData) => Promise<void>;
}

export const useZap = create<ZapState>((set) => {
  return {
    zap: null,
    fetchZap: async (zapId: string) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/zap/${zapId}`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();
        if (response.ok) {
          set({ zap: result });
        } else {
          set({ zap: null });
          useError.getState().setError(result.message);
        }
      } catch (error: unknown) {
        set({ zap: null });
        useError.getState().setError((error as Error).message);
      }
    },
  };
});
