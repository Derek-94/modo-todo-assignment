import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import TODOS from 'constant/dummy.json';
import { Itodo } from 'types';
import Modal from 'components/common/Modal';
import useModal from 'hooks/useModal';
interface setTodoProps {
  setTodoState: (todos: Itodo[]) => void;
}

const SetTodo: React.FC<setTodoProps> = ({ setTodoState }) => {
  const [isModalOpen, toggleModal] = useModal();
  const [modaltype, setModaltype] = useState<'clear' | 'dummy'>('clear');
  const initialTodo = TODOS as Itodo[];

  const clearTodos = () => {
    setModaltype('clear');
    toggleModal();
  };

  const showDummy = () => {
    setModaltype('dummy');
    toggleModal();
  };

  const modalState = {
    clear: {
      content: '모두 지우시겠습니까?',
      callback: () => setTodoState([]),
    },
    dummy: {
      content: '더미데이터를 불러오겠습니까?',
      callback: () => setTodoState(initialTodo),
    },
  };

  return (
    <SetTodoWrap>
      <Button onClick={showDummy}>더미 데이터 불러오기</Button>
      <ClearButton onClick={clearTodos}>전체 지우기</ClearButton>
      {isModalOpen && (
        <Modal toggle={toggleModal} callback={modalState[modaltype].callback}>
          {modalState[modaltype].content}
        </Modal>
      )}
    </SetTodoWrap>
  );
};

const ClearButton = styled(Button)`
  margin-left: 16px;
`;
const SetTodoWrap = styled.div`
  text-align: right;
  margin-right: ${({ theme }) => theme.layout.gap};
`;
export default SetTodo;
