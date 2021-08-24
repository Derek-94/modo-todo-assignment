export interface Itodo {
  id: number;
  taskName: string;
  status: StatusKey;
}
export type StatusKey = 'Todo' | 'InProgress' | 'Done';
