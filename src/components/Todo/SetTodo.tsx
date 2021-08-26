import React, { useState, useEffect } from 'react';
import Button from 'components/common/Button';
import { Itodo } from 'types';
import TODOS from 'constant/dummy.json';
import styled from 'styled-components';

interface setTodoProps {
  todoLength: number;
  setTodos: (todos: Itodo[]) => void;
}
const SetTodo: React.FC<setTodoProps> = ({ todoLength, setTodos }) => {
  const initialTodo = TODOS as Itodo[];
  const clearTodos = () => {
    setTodos([]);
  };
  const showDummy = () => {
    setTodos(initialTodo);
  };
  const [showClear, setShowClear] = useState(todoLength > 3);
  useEffect(() => {
    setShowClear(todoLength > 3);
  }, [todoLength]);
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
  margin-right: 24px;
`;
export default SetTodo;
