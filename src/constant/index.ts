import { StatusKey, MenuOption } from 'types';

export const STATUS: StatusKey[] = ['Todo', 'InProgress', 'Done'];

export const MENU: MenuOption = Object.freeze({
  PRIORITY: ['low', 'medium', 'high'],
  FILTER: ['Init', 'Deadline', 'Priority'],
  KOR: ['낮음', '보통', '높음'],
});
