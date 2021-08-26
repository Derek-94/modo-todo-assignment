import { StatusKey, MenuObj } from 'types';

export const STATUS: StatusKey[] = ['Todo', 'InProgress', 'Done'];

export const MENU: MenuObj = Object.freeze({
  PRIORITY: ['low', 'medium', 'high'],
  FILTER: ['Init', 'Deadline', 'Priority'],
});
