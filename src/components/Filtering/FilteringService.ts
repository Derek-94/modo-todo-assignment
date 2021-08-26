import { useState, useEffect } from 'react';
import { Itodo, ClickObj, PriorityType, FilterReducer } from 'types';
import TODOS from 'constant/dummy.json';
import { getStorage, setStorage } from 'utils/storage';

interface FilteringData {
  todoState: Itodo[];
  handlerFiltering: (type: FilterReducer, action?: PriorityType) => void;
  handlerDropdown: () => void;
  dropdownOpen: boolean;
  click: ClickObj;
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
}

const initialTodos: Itodo[] = TODOS as Itodo[];

export const useFiltering = (): FilteringData => {
  const [originalData] = useState<Itodo[]>(initialTodos);
  const [todoState, setTodoState] = useState<Itodo[]>(initialTodos);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState<ClickObj>({
    deadline: false,
    priority: null,
  });

  useEffect(() => {
    // setStorage('todos', TODOS);
    // const getData = getStorage('todos') || [];
    // setOriginalData(getData);
    // setTodoState(getData);
  }, []);

  useEffect(() => {
    setDropdownOpen(!open);
    const filteredByPrioriry = filterByPriority(originalData, click.priority);
    const filteredByDeadLine = filterByDeadline(filteredByPrioriry);
    setTodoState(filteredByDeadLine);
  }, [click]);

  const filterByPriority = (todos: Itodo[], priority: PriorityType | null) => {
    if (priority) {
      return todos.filter(todo => todo.priority === priority);
    }
    return todos;
  };

  const deadlineFilter = (todo: Itodo) => {
    // 60 * 60 * 24 * 1000 = 86400000 (1 day)
    const currentDay = new Date(new Date().setHours(0, 0, 0, 0));
    const dueDate = new Date(todo.dueDate || '').setHours(0, 0, 0, 0);
    const deadLine = dueDate - currentDay.getTime();
    return deadLine <= 172800000 && deadLine >= -172800000;
  };

  const filterByDeadline = (todos: Itodo[]) => {
    if (click.deadline) {
      return todos.filter(deadlineFilter);
    }
    return todos;
  };

  const handlerFiltering = (type: FilterReducer, action?: PriorityType) => {
    switch (type) {
      case 'PRIORITY':
        handlerPriorityState(action || null);
        return;
      case 'DEADLINE':
        handlerDeadlineState();
        return;
      case 'INIT':
        handlerResetState();
        return;
    }
  };

  const handlerPriorityState = (target: PriorityType | null) => {
    setClick({ ...click, priority: target });
  };

  const handlerDeadlineState = () => {
    setClick({ ...click, deadline: !click.deadline });
  };

  const handlerResetState = () => {
    setClick({ deadline: false, priority: null });
  };

  const handlerDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
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
