import React, { useState } from 'react';
import { TODOS, STATUS } from 'constant';
import { StatusKey, Itodo, PriorityType } from 'types';
import Column from './Column';
import uuidv4 from '../../utils/getUuid';
import styled from 'styled-components';

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
      <form>
        <Input
          required
          value={inputTodo}
          onChange={onChangeInput}
          placeholder="Input your todos..."
        />
        <Select required onChange={onChangePriority}>
          <option value="default" disabled>
            우선순위를 선택해주세요.
          </option>
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </Select>
        <TodoRegisterButton onClick={onRegisterTodo}>등록</TodoRegisterButton>
      </form>
      {validationError && (
        <ErrorMessage>위 항목 중 선택하지 않은 것이 있습니다. 😥</ErrorMessage>
      )}
      <MainContainer>
        {STATUS.map((status, i) => (
          <Column
            key={i}
            status={status}
            todos={filterList(status)}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </MainContainer>
    </>
  );
};
export default TodoList;

const Input = styled.input`
  min-width: 300px;
  padding: 16px;
`;

const Select = styled.select`
  margin: 10px 10px;
  padding: 16px;
  cursor: pointer;
`;

const TodoRegisterButton = styled.button`
  padding: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: crimson;
  margin: 0px 0px 15px 10px;
  font-weight: bold;
  font-size: 18px;
`;

const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
`;
