import React from 'react';
import { STATUS } from 'constant';
import { Itodo, StatusKey } from 'types';
import Column from './Column';
import TodoForm from './TodoForm';
import styled from 'styled-components';
import DragProvider from 'contexts/DragContext';

import { useFiltering } from 'components/Filtering/FilteringService';
import FilteringContainer from 'components/Filtering/FilteringContainer';
import SetTodo from 'components/Todo/SetTodo';

const TodoList: React.FC = () => {
  const {
    todoState,
    filterTodo,
    setTodoState,
    handlerFiltering,
    handlerDropdown,
    dropdownOpen,
    filterOpt,
  } = useFiltering();

  const filterList = (status: StatusKey) =>
    filterTodo.filter(todo => todo.status === status);

  const onDeleteTodo = (id: string) => {
    setTodoState(todoState => todoState.filter(todo => todo.id !== id));
  };

  const onAddTodo = (newTodo: Itodo) => {
    setTodoState(prevState => [...prevState, newTodo]);
  };

  return (
    <>
      <TodoFormWrapper>
        <TodoForm onAddTodo={onAddTodo} />
        <FilteringContainer
          handlerFiltering={handlerFiltering}
          handlerDropdown={handlerDropdown}
          dropdownOpen={dropdownOpen}
          filterOpt={filterOpt}
        />
      </TodoFormWrapper>
      {/* <SetTodo todoLength={filterTodo.length} setTodos={setTodoState} /> */}
      <SetTodo todoLength={todoState.length} setTodos={setTodoState} />
      <MainContainer>
        <DragProvider>
          {STATUS.map((status, i) => (
            <Column
              key={i}
              status={status}
              filtered={filterList(status)}
              todos={filterTodo}
              setTodoState={setTodoState}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </DragProvider>
      </MainContainer>
    </>
  );
};

const TodoFormWrapper = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout.listPadding};
`;

export default TodoList;
