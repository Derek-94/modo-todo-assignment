import { useState, useEffect } from 'react';
import TODOS from 'constant/default.json';
import { Itodo, ClickObj, PriorityType, FilterReducer } from 'types';
import { getStorage, setStorage } from 'utils/storage';
import { currentDate } from 'utils/date';

interface FilteringData {
  filterTodo: Itodo[];
  handlerFiltering: (type: FilterReducer, action?: PriorityType) => void;
  handlerDropdown: () => void;
  dropdownOpen: boolean;
  filterOpt: ClickObj;
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
}

export const useFiltering = (): FilteringData => {
  const [todoState, setTodoState] = useState<Itodo[]>([]);
  const [filterTodo, setFilterTodo] = useState<Itodo[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterOpt, setFilterOpt] = useState<ClickObj>({
    deadline: false,
    priority: null,
  });

  useEffect(() => {
    const getData = (getStorage('modu_todos') || TODOS) as Itodo[];
    setTodoState(getData);
  }, []);

  useEffect(() => {
    setStorage('modu_todos', todoState);
  }, [todoState]);

  useEffect(() => {
    setDropdownOpen(!open);
    const filteredByPrioriry = filterByPriority(todoState, filterOpt.priority);
    const filteredByDeadLine = filterByDeadline(filteredByPrioriry);
    setFilterTodo(filteredByDeadLine);
  }, [todoState, filterOpt]);

  const filterByPriority = (todos: Itodo[], priority: PriorityType | null) => {
    if (priority) {
      return todos.filter(todo => todo.priority === priority);
    }
    return todos;
  };

  const deadlineFilter = (todo: Itodo) => {
    const currentDay = currentDate();
    const dueDate = new Date(todo.dueDate || '').setHours(0, 0, 0, 0);
    const deadLine = dueDate - currentDay.getTime();
    return deadLine <= 172800000 && deadLine >= -172800000;
  };

  const filterByDeadline = (todos: Itodo[]) => {
    if (filterOpt.deadline) {
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
    setFilterOpt({ ...filterOpt, priority: target });
  };

  const handlerDeadlineState = () => {
    setFilterOpt({ ...filterOpt, deadline: !filterOpt.deadline });
  };

  const handlerResetState = () => {
    setFilterOpt({ deadline: false, priority: null });
  };

  const handlerDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  return {
    filterTodo,
    setTodoState,
    handlerFiltering,
    handlerDropdown,
    dropdownOpen,
    filterOpt,
  };
};
