import React from 'react';
import styled from 'styled-components';
import Column from './Column';
import TodoForm from './TodoForm';
import FilteringContainer from 'components/Filtering/FilteringContainer';
import SetTodo from 'components/Todo/SetTodo';
import DragProvider from 'contexts/DragContext';
import { useTodoService } from 'components/TodoService';
import { STATUS } from 'constant';
import { Itodo, StatusKey } from 'types';

const TodoList: React.FC = () => {
  const { filterTodo, setTodoState, handlerFiltering, filterOpt } =
    useTodoService();

  const filterList = (status: StatusKey) =>
    filterTodo.filter(todo => todo.status === status);

  const onAddTodo = (newTodo: Itodo) => {
    setTodoState(prevState => [...prevState, newTodo]);
  };

  const onDeleteTodo = (id: string) => {
    setTodoState(todoState => todoState.filter(todo => todo.id !== id));
  };

  return (
    <>
      <TodoFormWrapper>
        <TodoForm onAddTodo={onAddTodo} />
      </TodoFormWrapper>
      <TodoNavigation>
        <FilteringContainer
          handlerFiltering={handlerFiltering}
          filterOpt={filterOpt}
        />
        <SetTodo setTodoState={setTodoState} />
      </TodoNavigation>
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
const TodoNavigation = styled.div`
  margin-top: ${({ theme }) => theme.layout.gap};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TodoFormWrapper = styled.div`
  padding-top: 40px;
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
