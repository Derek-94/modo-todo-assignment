import { useState, useEffect } from 'react';
import { Itodo, ClickObj } from 'types';
import { MENU } from 'constant';
import TODOS from 'constant/default.json';
import { getStorage, setStorage } from 'utils/storage';

interface FilteringData {
  todoState: Itodo[];
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
  handlerFiltering: (target: string) => void;
  handlerDropdown: () => void;
  dropdownOpen: boolean;
  click: ClickObj;
}

export const useFiltering = (): FilteringData => {
  const [originalData] = useState<Itodo[]>([]);
  const [todoState, setTodoState] = useState<Itodo[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState({
    origin: true,
    priority: false,
    deadline: false,
    priorityTarget: '',
  });

  useEffect(() => {
    const getData = (getStorage('modu_todos') || TODOS) as Itodo[];
    setTodoState(getData);
  }, []);

  useEffect(() => {
    setStorage('modu_todos', todoState);
  }, [todoState]);

  const handlerFiltering = (target: string): void => {
    switch (target) {
      default:
        break;

      case MENU.FILTER[0]:
        handlerOriginState();
        return;

      case MENU.FILTER[1]:
        handlerDeadlineState();
        return;

      case MENU.PRIORITY[0]:
        handlerPriorityState('low');
        setDropdownOpen(!open);
        return;

      case MENU.PRIORITY[1]:
        handlerPriorityState('medium');
        setDropdownOpen(!open);
        return;

      case MENU.PRIORITY[2]:
        handlerPriorityState('high');
        setDropdownOpen(!open);
        return;
    }
  };

  const handlerPriorityState = (target: string) => {
    if (click.deadline) {
      const priorityArr = filterTodoByPriority(target);
      const deadlineArr = filterTodoByDeadline();
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
      setTodoState(filterTodoByPriority(target));
    }
  };

  const handlerDeadlineState = () => {
    if (dropdownOpen) setDropdownOpen(!dropdownOpen);

    if (click.deadline) {
      setClick({ ...click, origin: true, deadline: false });
      setTodoState(originalData);
    }

    if (click.priority) {
      if (click.deadline) {
        setClick({ ...click, origin: false, deadline: false });
        setTodoState(filterTodoByPriority(click.priorityTarget));
      } else {
        const priorityArr = filterTodoByPriority(click.priorityTarget);
        const deadlineArr = filterTodoByDeadline();
        const intersectionArr = priorityArr.filter(arr =>
          deadlineArr.includes(arr)
        );

        setClick({ ...click, origin: false, deadline: true });
        setTodoState(intersectionArr);
      }
    }
    if (!click.deadline && !click.priority) {
      setClick({ ...click, origin: false, deadline: true });
      setTodoState(filterTodoByDeadline());
    }
  };

  const handlerOriginState = () => {
    if (dropdownOpen) setDropdownOpen(!dropdownOpen);
    setClick({
      origin: true,
      priority: false,
      deadline: false,
      priorityTarget: 'Priority',
    });
    setTodoState(originalData);
  };

  const handlerDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  const filterTodoByPriority = (priorityStd: string): Itodo[] => {
    const data = originalData;
    const filteredTodos = data.filter(
      (todo: Itodo) => todo.priority === priorityStd
    );

    return filteredTodos;
  };

  const filterTodoByDeadline = (): Itodo[] => {
    const data = originalData;
    const currentDay = new Date(new Date().setHours(0, 0, 0, 0));

    // 60 * 60 * 24 * 1000 = 86400000 (1 day)
    const filtering = data.filter((todo: Itodo) => {
      const dueDate = new Date(todo.dueDate || '').setHours(0, 0, 0, 0);
      const deadLine = dueDate - currentDay.getTime();

      return deadLine <= 172800000 && deadLine >= 0;
    });

    return filtering;
  };

  return {
    todoState,
    setTodoState,
    handlerFiltering,
    handlerDropdown,
    dropdownOpen,
    click,
  };
};
