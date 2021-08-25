import React, { useState } from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey, Itodo, PriorityType } from 'types';
import Column from './Column';
import Button from '../common/Button';
import uuidv4 from '../../utils/getUuid';
import styled from 'styled-components';
import DragProvider from 'contexts/DragContext';

const TodoList: React.FC = () => {
  const [inputTodo, setInputTodo] = useState<string>('');
  const [priority, setPriority] = useState<PriorityType>('');
  const [validationError, setValidationError] = useState<boolean>(false);
  const [todoState, setTodoState] = useState<Itodo[]>(TODOS);

  const filterList = (status: StatusKey) =>
    todoState.filter(todo => todo.status === status);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setInputTodo(e.currentTarget.value);
  };

  const onChangePriority: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setPriority(e.target.value as PriorityType);
  };

  const onRegisterTodo: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (inputTodo.length === 0 || priority === '') {
      setValidationError(() => true);
    } else {
      setValidationError(() => false);
      setInputTodo('');
      setTodoState([
        ...todoState,
        {
          id: uuidv4(),
          taskName: inputTodo,
          status: 'Todo',
          priority: priority,
        },
      ]);
    }
  };

  const onDeleteTodo = (id: string) => {
    setTodoState(todoState.filter(todo => todo.id !== id));
  };

  return (
    <>
      <TodoForm>
        <Input
          required
          value={inputTodo}
          onChange={onChangeInput}
          placeholder="Input your todos..."
        />
        <Select defaultValue="default" required onChange={onChangePriority}>
          <option value="default" disabled>
            우선순위를 선택해주세요.
          </option>
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </Select>
        <Button Large onClick={onRegisterTodo}>
          등록
        </Button>
      </TodoForm>
      {validationError && (
        <ErrorMessage>위 항목 중 선택하지 않은 것이 있습니다. 😥</ErrorMessage>
      )}
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

const TodoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`;

const Input = styled.input`
  min-width: 300px;
  padding: ${({ theme }) => theme.layout.padding};
  background-color: ${({ theme }) => theme.color.whiteBackground};
  border-radius: ${({ theme }) => theme.layout.radius};
  font-weight: ${({ theme }) => theme.layout.fontBold};
`;

const Select = styled.select`
  margin: 10px 10px;
  padding: ${({ theme }) => theme.layout.padding};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.layout.radius};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.red};
  display: flex;
  justify-content: center;
  margin: 10px;
  font-weight: ${({ theme }) => theme.layout.fontBold};
  font-size: 18px;
`;

const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout.listPadding};
`;

export default TodoList;
