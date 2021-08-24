import { Itodo, StatusKey } from 'types';

export const TODOS: Itodo[] = [
  { id: 1, taskName: '기본세팅', status: 'Done' },
  { id: 2, taskName: '원티드 프로젝트', status: 'InProgress' },
  { id: 3, taskName: '자소서 쓰기', status: 'Todo' },
  { id: 4, taskName: '리드미 작성', status: 'Todo' },
  { id: 5, taskName: '거리 두기', status: 'InProgress' },
  { id: 6, taskName: '회의', status: 'Todo' },
  { id: 7, taskName: '캐치마인드', status: 'Todo' },
];

export const STATUS: StatusKey[] = ['Todo', 'InProgress', 'Done'];
