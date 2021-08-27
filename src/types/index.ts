export interface Itodo {
  id: string;
  taskName: string;
  status: StatusKey;
  priority: PriorityType;
  createdAt?: string;
  updatedAt?: string;
  dueDate: string;
  memo?: string;
}

export interface FilterOption {
  deadline: boolean;
  priority: PriorityType | null;
}

export interface MenuOption {
  PRIORITY: PriorityType[];
  FILTER: string[];
  KOR: string[];
}

export type FilterReducer = 'PRIORITY' | 'DEADLINE' | 'INIT';
export type PriorityType = '' | 'low' | 'medium' | 'high';
export type StatusKey = 'Todo' | 'InProgress' | 'Done';
