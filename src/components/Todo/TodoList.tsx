import React, { useState } from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey } from 'types';
import Column from './Column';
import styled from 'styled-components';

import { useFiltering } from 'components/Filtering/FilteringService';
import FilteringContainer from 'components/Filtering/FilteringContainer';

const TodoList: React.FC = () => {
  const { handlerFiltering, handlerDrop, open, todoState, click } =
    useFiltering();

  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);

  return (
    <>
      <FilteringContainer
        handlerFiltering={handlerFiltering}
        handlerDrop={handlerDrop}
        open={open}
        click={click}
      />
      <MainContainer>
        {STATUS.map((status, i) => (
          <Column key={i} status={status} todos={filterList(status)} />
        ))}
      </MainContainer>
    </>
  );
};
export default TodoList;

const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
`;
