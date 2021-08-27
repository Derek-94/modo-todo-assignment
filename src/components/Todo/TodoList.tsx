import React, { useState } from 'react';
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
    filterTodo,
    setTodoState,
    handlerFiltering,
    handlerDropdown,
    dropdownOpen,
    filterOpt,
  } = useFiltering();
  const [validationError, setValidationError] = useState<boolean>(false);

  const filterList = (status: StatusKey) =>
    filterTodo.filter(todo => todo.status === status);

  const onAddTodo = (newTodo: Itodo) => {
    setTodoState(prevState => [...prevState, newTodo]);
  };

  const onDeleteTodo = (id: string) => {
    setTodoState(todoState => todoState.filter(todo => todo.id !== id));
  };

  const onValidationCheck = (validCheck: boolean) => {
    setValidationError(validCheck);
  };

  return (
    <>
      <TodoFormWrapper>
        <TodoForm onAddTodo={onAddTodo} onValidationCheck={onValidationCheck} />
        <FilteringContainer
          handlerFiltering={handlerFiltering}
          handlerDropdown={handlerDropdown}
          dropdownOpen={dropdownOpen}
          filterOpt={filterOpt}
        />
      </TodoFormWrapper>
      {validationError && (
        <ErrorMessage>위 항목 중 선택하지 않은 것이 있습니다. 😥</ErrorMessage>
      )}
      <SetTodo todoLength={filterTodo.length} setTodos={setTodoState} />
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

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.red};
  display: flex;
  justify-content: center;
  margin: 6px;
  font-weight: ${({ theme }) => theme.layout.fontBold};
  font-size: 18px;
`;

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
