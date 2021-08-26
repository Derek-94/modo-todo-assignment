export interface Itodo {
  id: string;
  taskName: string;
  status: StatusKey;
  priority?: PriorityType;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
}

export interface ClickObj {
  deadline: boolean;
  priority: PriorityType | null;
}

export interface MenuObj {
  PRIORITY: PriorityType[];
  FILTER: string[];
}

export type FilterReducer = 'PRIORITY' | 'DEADLINE' | 'INIT';
export type PriorityType = '' | 'low' | 'medium' | 'high';
export type StatusKey = 'Todo' | 'InProgress' | 'Done';
