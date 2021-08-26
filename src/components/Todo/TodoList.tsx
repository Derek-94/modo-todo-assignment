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
    handlerFiltering,
    handlerDropdown,
    dropdownOpen,
    click,
    todoState,
    setTodoState,
  } = useFiltering();

  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);

  const onDeleteTodo = (id: string) => {
    setTodoState(todoState.filter(todo => todo.id !== id));
  };

  const onAddTodo = (newTodo: Itodo) => {
    setTodoState([...todoState, newTodo]);
  };

  return (
    <>
      <TodoFormWrapper>
        <TodoForm onAddTodo={onAddTodo} />
        <FilteringContainer
          handlerFiltering={handlerFiltering}
          handlerDropdown={handlerDropdown}
          dropdownOpen={dropdownOpen}
          click={click}
        />
      </TodoFormWrapper>
      <SetTodo todoLength={todoState.length} setTodos={setTodoState} />
      <MainContainer>
        <DragProvider>
          {STATUS.map((status, i) => (
            <Column
              key={i}
              status={status}
              filtered={filterList(status)}
              todos={todoState}
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
