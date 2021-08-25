import { Itodo, StatusKey, MenuObj } from 'types';

export const TODOS: Itodo[] = [
  {
    id: 1,
    taskName: '기본세팅',
    status: 'Done',
    priority: 'medium',
    dueDate: '2021-08-24',
  },
  {
    id: 2,
    taskName: '원티드프로젝트',
    status: 'InProgress',
    priority: 'high',
    dueDate: '2021-08-25',
  },
  {
    id: 3,
    taskName: '자소서 쓰기',
    status: 'Todo',
    priority: 'medium',
    dueDate: '2021-08-26',
  },
  {
    id: 4,
    taskName: '리드미 작성',
    status: 'Todo',
    priority: 'medium',
    dueDate: '2021-08-27',
  },
  {
    id: 5,
    taskName: '거리 두기',
    status: 'InProgress',
    priority: 'medium',
    dueDate: '2021-08-28',
  },
  {
    id: 6,
    taskName: '회의',
    status: 'Todo',
    priority: 'medium',
    dueDate: '2021-08-29',
  },
  {
    id: 7,
    taskName: '캐치마인드',
    status: 'Todo',
    priority: 'medium',
    dueDate: '2021-08-30',
  },
];

export const STATUS: StatusKey[] = ['Todo', 'InProgress', 'Done'];

export const MENU: MenuObj = Object.freeze({
  PRIORITY: ['low', 'medium', 'high'],
  FILTER: ['Init', 'Deadline', 'Priority'],
});
