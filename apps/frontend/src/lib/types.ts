export interface ZapData {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  action: Action[];
  trigger: Trigger;
}

export interface Action {
  id: string;
  actionId: string;
  zapId: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  sortingOrder: number;
  type: ActionType;
}

export interface ActionType {
  icon: string;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trigger {
  id: string;
  icon: string;
  triggerId: string;
  zapId: string;
  createdAt: string;
  updatedAt: string;
  type: TriggerType;
}

export interface TriggerType {
  id: string;
  icon: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface DialogState {
  open: boolean;
  zapItemData?: {
    type: "read" | "write";
    action?: {
      id: string;
    };
  };
}
