import { Itodo, StatusKey } from 'types';
import uuidv4 from '../utils/getUuid';

export const TODOS: Itodo[] = [
  { id: uuidv4(), taskName: '기본세팅', status: 'Done', priority: 'medium' },
  {
    id: uuidv4(),
    taskName: '원티드프로젝트',
    status: 'InProgress',
    priority: 'high',
  },
  { id: uuidv4(), taskName: '자소서 쓰기', status: 'Todo', priority: 'medium' },
  { id: uuidv4(), taskName: '리드미 작성', status: 'Todo', priority: 'medium' },
  {
    id: uuidv4(),
    taskName: '거리 두기',
    status: 'InProgress',
    priority: 'medium',
  },
  { id: uuidv4(), taskName: '회의', status: 'Todo', priority: 'medium' },
  { id: uuidv4(), taskName: '캐치마인드', status: 'Todo', priority: 'medium' },
];

export const STATUS: StatusKey[] = ['Todo', 'InProgress', 'Done'];
