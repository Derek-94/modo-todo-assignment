import React, { useState } from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey } from 'types';
import Column from './Column';
import styled from 'styled-components';
import DragProvider from 'contexts/DragContext';

import { useFiltering } from 'components/Filtering/FilteringService';
import FilteringContainer from 'components/Filtering/FilteringContainer';

const TodoList: React.FC = () => {
  const { handlerFiltering, handlerDropdown, dropdownOpen, todoState, click } =
    useFiltering();

  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);

  return (
    <>
      <FilteringContainer
        handlerFiltering={handlerFiltering}
        handlerDropdown={handlerDropdown}
        dropdownOpen={dropdownOpen}
        click={click}
      />
    <MainContainer>
      <DragProvider>
        {STATUS.map((status, i) => (
          <Column
            key={i}
            status={status}
            filtered={filterList(status)}
            todos={todoState}
            setTodoState={setTodoState}
          />
        ))}
      </DragProvider>
    </MainContainer>
  </>
  );
};
const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
`;

export default TodoList;
