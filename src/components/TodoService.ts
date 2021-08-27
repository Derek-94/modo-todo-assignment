import { useState, useEffect } from 'react';
import TODOS from 'constant/default.json';
import { Itodo, FilterOption, PriorityType, FilterReducer } from 'types';
import { getStorage, setStorage } from 'utils/storage';
import { currentDate } from 'utils/date';

interface TodoServiceData {
  filterTodo: Itodo[];
  handlerFiltering: (type: FilterReducer, action?: PriorityType) => void;
  filterOpt: FilterOption;
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
}

export const useTodoService = (): TodoServiceData => {
  const [todoState, setTodoState] = useState<Itodo[]>([]);
  const [filterTodo, setFilterTodo] = useState<Itodo[]>([]);
  const [filterOpt, setFilterOpt] = useState<FilterOption>({
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
    return deadLine <= 172800000 && deadLine >= 0;
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

  return {
    filterTodo,
    setTodoState,
    handlerFiltering,
    filterOpt,
  };
};
