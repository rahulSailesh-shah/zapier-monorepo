import { ActionType, DialogState, TriggerType, ZapData } from "@/lib/types";
import { create } from "zustand";
import { useError } from "./error";

interface ZapState {
  zap: ZapData | null;
  availableActions: ActionType[];
  availableTriggers: TriggerType[];
  fetchZap: (zapId: string) => Promise<void>;
  updateZapTask: (item: DialogState, triggerId: string) => void;
  setAvailableActions: () => Promise<void>;
  setAvailableTriggers: () => Promise<void>;
  updateZapActionTrigger: (zapId: string) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useZap = create<ZapState>((set, get) => ({
  zap: null,
  availableActions: [],
  availableTriggers: [],

  fetchZap: async (zapId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/zap/${zapId}`, {
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        set({ zap: result });
      } else {
        set({ zap: null });
        useError.getState().setError(result.message);
      }
    } catch (error) {
      set({ zap: null });
      useError.getState().setError((error as Error).message);
    }
  },

  setAvailableTriggers: async () => {
    await fetchAndSetData("triggers", "availableTriggers");
  },

  setAvailableActions: async () => {
    await fetchAndSetData("actions", "availableActions");
  },

  updateZapTask: (item: DialogState, triggerId: string) => {
    const { zapItemData } = item;
    if (!zapItemData) return;

    const currentZap = get().zap;
    if (!currentZap) return;

    if (zapItemData.type === "read") {
      set({
        zap: {
          ...currentZap,
          trigger: { ...currentZap.trigger, triggerId },
        },
      });
    } else if (zapItemData.type === "write" && zapItemData.action) {
      set({
        zap: {
          ...currentZap,
          action: currentZap.action.map((a) =>
            a.id === zapItemData.action?.id ? { ...a, actionId: triggerId } : a
          ),
        },
      });
    }
  },

  updateZapActionTrigger: async (zapId: string) => {
    const currentZap = get().zap;
    if (!currentZap) return;

    try {
      const data = {
        triggerId: currentZap.trigger.triggerId,
        actions: currentZap.action.map((action) => ({
          actionId: action.actionId,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/api/zap/${zapId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        set({ zap: result });
      } else {
        set({ zap: null });
        useError.getState().setError(result.message);
      }
    } catch (error) {
      set({ zap: null });
      useError.getState().setError((error as Error).message);
    }
  },
}));

async function fetchAndSetData(
  endpoint: string,
  stateKey: "availableTriggers" | "availableActions"
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
      credentials: "include",
    });
    const result = await response.json();

    if (response.ok) {
      useZap.setState({ [stateKey]: result.data });
    } else {
      useError.getState().setError(result.message);
    }
  } catch (error) {
    useError.getState().setError((error as Error).message);
  }
}
