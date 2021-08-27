import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import TODOS from 'constant/dummy.json';
import { Itodo } from 'types';

interface setTodoProps {
  todoLength: number;
  setTodos: (todos: Itodo[]) => void;
}

const SetTodo: React.FC<setTodoProps> = ({ todoLength, setTodos }) => {
  const [showClear, setShowClear] = useState(todoLength > 0);

  useEffect(() => {
    setShowClear(todoLength > 0);
  }, [todoLength]);

  const initialTodo = TODOS as Itodo[];
  const clearTodos = () => {
    setTodos([]);
  };
  const showDummy = () => {
    setTodos(initialTodo);
  };

  return (
    <SetTodoWrap>
      {showClear ? (
        <Button onClick={clearTodos}>전체 지우기</Button>
      ) : (
        <Button onClick={showDummy}>더미 데이터 불러오기</Button>
      )}
    </SetTodoWrap>
  );
};
const SetTodoWrap = styled.div`
  text-align: right;
  margin-right: ${({ theme }) => theme.layout.gap};
`;
export default SetTodo;
