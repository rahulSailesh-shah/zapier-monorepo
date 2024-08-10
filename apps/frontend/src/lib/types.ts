export interface ZapData {
  id: string;
  createdAt: string;
  updatedAt: string;
  triggerId: string;
  userId: string;
  action: Action[];
  trigger: Trigger;
}

interface Action {
  id: string;
  actionId: string;
  zapId: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  sortingOrder: number;
  type: ActionType;
}

interface ActionType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Trigger {
  id: string;
  triggerId: string;
  zapId: string;
  createdAt: string;
  updatedAt: string;
  type: TriggerType;
}

interface TriggerType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
