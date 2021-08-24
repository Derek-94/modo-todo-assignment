import { Itodo, StatusKey } from 'types';

export const TODOS: Itodo[] = [
  { id: 1, taskName: '기본세팅', status: 'Done', priority: 'medium' },
  { id: 2, taskName: '원티드프로젝트', status: 'InProgress', priority: 'high' },
  { id: 3, taskName: '자소서 쓰기', status: 'Todo', priority: 'medium' },
  { id: 4, taskName: '리드미 작성', status: 'Todo', priority: 'medium' },
  { id: 5, taskName: '거리 두기', status: 'InProgress', priority: 'medium' },
  { id: 6, taskName: '회의', status: 'Todo', priority: 'medium' },
  { id: 7, taskName: '캐치마인드', status: 'Todo', priority: 'medium' },
];

export const STATUS: StatusKey[] = ['Todo', 'InProgress', 'Done'];
