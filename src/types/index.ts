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
  origin: boolean;
  priority: boolean;
  deadline: boolean;
  priorityTarget: string;
}

export interface MenuObj {
  PRIORITY: string[];
  FILTER: string[];
}

export type PriorityType = '' | 'low' | 'medium' | 'high';
export type StatusKey = 'Todo' | 'InProgress' | 'Done';
