import { useState, useEffect } from 'react';
import { Itodo, ClickObj } from 'types';
import { TODOS, MENU } from 'constant';
import { getStorage, setStorage } from 'utils/storage';

interface FilteringData {
  todoState: Itodo[];
  handlerFiltering: (target: string) => void;
  handlerDrop: () => void;
  open: boolean;
  click: ClickObj;
}

// handlerFiltering: (e: React.MouseEvent<HTMLButtonElement>) => void;

const initialTodos: Itodo[] = [];

export const useFiltering = (): FilteringData => {
  const [originalData, setOriginalData] = useState<Itodo[]>(initialTodos);
  const [todoState, setTodoState] = useState(TODOS);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState({
    origin: true,
    priority: false,
    deadline: false,
    priorityTarget: '',
  });

  useEffect(() => {
    // setStorage('todos', TODOS);
    const getData = getStorage('todos') || [];

    setOriginalData(getData);
    setTodoState(getData);
  }, []);

  useEffect(() => {
    setTodoState(todoState);
  }, [todoState]);

  // const handlerFiltering = (e: React.MouseEvent<HTMLButtonElement>): void => {
  const handlerFiltering = (target: string): void => {
    if (target === MENU.FILTER[0]) handlerOriginState();
    if (target === MENU.FILTER[1]) handlerDeadlineState();
    if (target === MENU.PRIORITY[0]) {
      handlerPriorityState('low');
      setOpen(!open);
    }
    if (target === MENU.PRIORITY[1]) {
      handlerPriorityState('medium');
      setOpen(!open);
    }
    if (target === MENU.PRIORITY[2]) {
      handlerPriorityState('high');
      setOpen(!open);
    }
  };

  const handlerPriorityState = (target: string) => {
    if (click.deadline) {
      const priorityArr = filteringPriority(target);
      const deadlineArr = filteringDeadline();
      const intersectionArr = priorityArr.filter(arr =>
        deadlineArr.includes(arr)
      );

      setClick({
        ...click,
        origin: false,
        priority: true,
        priorityTarget: target,
      });
      setTodoState(intersectionArr);
    } else {
      setClick({
        ...click,
        origin: false,
        priority: true,
        priorityTarget: target,
      });
      setTodoState(filteringPriority(target));
    }
  };

  const handlerDeadlineState = () => {
    if (open) setOpen(!open);

    if (click.deadline) {
      setClick({ ...click, origin: true, deadline: false });
      setTodoState(originalData);
    }

    if (click.priority) {
      if (click.deadline) {
        setClick({ ...click, origin: false, deadline: false });
        setTodoState(filteringPriority(click.priorityTarget));
      } else {
        const priorityArr = filteringPriority(click.priorityTarget);
        const deadlineArr = filteringDeadline();
        const intersectionArr = priorityArr.filter(arr =>
          deadlineArr.includes(arr)
        );

        setClick({ ...click, origin: false, deadline: true });
        setTodoState(intersectionArr);
      }
    }
    if (!click.deadline && !click.priority) {
      setClick({ ...click, origin: false, deadline: true });
      setTodoState(filteringDeadline());
    }
  };

  const handlerOriginState = () => {
    if (open) setOpen(!open);
    setClick({
      ...click,
      origin: true,
      priority: false,
      deadline: false,
      priorityTarget: 'Priority',
    });
    setTodoState(originalData);
  };

  const handlerDrop = (): void => {
    setOpen(!open);
  };

  const filteringPriority = (target: string): Itodo[] => {
    const data = originalData;
    const filtering = data.filter((todo: Itodo) => todo.priority === target);

    return filtering;
  };

  const filteringDeadline = (): Itodo[] => {
    const data = originalData;
    const currentDay = new Date(new Date().setHours(0, 0, 0, 0));

    // 60 * 60 * 24 * 1000 = 86400000 (1 day)
    const filtering = data?.filter((todo: Itodo) => {
      const dueDate = new Date(todo.dueDate || '').setHours(0, 0, 0, 0);
      const deadLine = dueDate - currentDay.getTime();

      return deadLine <= 172800000 && deadLine >= 0;
    });

    return filtering;
  };

  return {
    todoState,
    handlerFiltering,
    handlerDrop,
    open,
    click,
  };
};
