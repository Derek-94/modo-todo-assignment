export interface Itodo {
  id: number;
  taskName: string;
  status: StatusKey;
  priority?: PriorityType;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
}

export type PriorityType = 'low' | 'medium' | 'high';
export type StatusKey = 'Todo' | 'InProgress' | 'Done';
