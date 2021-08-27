import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import TodoDetail from './TodoDetail';
import Label from 'components/common/Label';
import Modal from 'components/common/Modal';
import useModal from 'hooks/useModal';
import { Itodo, PriorityType } from 'types';
import { findById, isOverHalf, mergeArray } from 'utils/dnd';
import { useDragDispatch, useDragState } from 'contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface TodoProps {
  todo: Itodo;
  todos: Itodo[];
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
  onDeleteTodo: (id: string) => void;
}

interface StyledTodoProps {
  focus: boolean;
  position: number;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  todos,
  setTodoState,
  onDeleteTodo,
}) => {
  const [isDeleteModal, toggleDeleteModal] = useModal();
  const [isDetailModal, toggleDetailModal] = useModal();

  const dispatch = useDragDispatch();
  const { position, hover } = useDragState();
  const todoRef = useRef<HTMLDivElement>(null);
  const handleDragEnd = () => {
    dispatch({ type: 'SET_HOVER', hover: null });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const dragId = e.dataTransfer.getData('id');
    const targetId = todo.id;

    const newStatus = todo.status;
    const from = findById(todos, dragId);
    const to = findById(todos, targetId) + (isOverHalf(e) ? 0 : -1);
    const newTodo: Itodo = {
      ...todos[from],
      status: newStatus,
    };
    const newTodos = mergeArray(todos, from, to, newTodo);
    setTodoState(newTodos);
    dispatch({ type: 'SET_HOVER', hover: null });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', e.currentTarget.dataset.id || '');
  };

  const handlerDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (todoRef.current) {
      const isOver = isOverHalf(e) ? 1 : -1;
      dispatch({
        type: 'SET_POSITION',
        position: isOver,
      });
      dispatch({
        type: 'SET_HOVER',
        hover: todoRef.current.dataset.id || null,
      });
    }
  };

  const onClickIcon: React.MouseEventHandler<SVGSVGElement> = e => {
    e.stopPropagation();
    todo.status === 'Done' ? onDeleteTodo(todo.id) : toggleDeleteModal();
  };

  const confirmModal = () => {
    onDeleteTodo(todo.id);
  };

  const priorityTransfer = (type?: PriorityType) => {
    switch (type) {
      case 'low':
        return '낮음';
      case 'medium':
        return '보통';
      case 'high':
        return '높음';
    }
  };

  return (
    <>
      <TodoContainer
        ref={todoRef}
        draggable
        data-id={todo.id}
        onDragStart={handleDragStart}
        onDragOver={handlerDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        focus={hover === todo.id}
        position={position}
        onClick={toggleDetailModal}
      >
        <TodoContent>
          <span>{todo.taskName}</span>
          <TodoOption>
            <TodoDesc>
              <Label priority={todo.priority}>
                {priorityTransfer(todo.priority)}
              </Label>
              <span>{todo.dueDate}</span>
            </TodoDesc>
            <Icon icon={faTrashAlt} onClick={onClickIcon} />
          </TodoOption>
        </TodoContent>
      </TodoContainer>
      {isDetailModal && (
        <Modal cancelBtn={false} toggle={toggleDetailModal}>
          <TodoDetail
            setTodoState={setTodoState}
            todo={todo}
            priorityTransfer={priorityTransfer}
          />
        </Modal>
      )}
      {isDeleteModal && (
        <Modal alert toggle={toggleDeleteModal} callback={confirmModal}>
          아직 완료되지 않은 항목인데 삭제하시겠습니까?
        </Modal>
      )}
    </>
  );
};

const marginByPosition = (props: StyledTodoProps) => {
  if (props.focus) {
    if (props.position > 0) {
      return css`
        padding-bottom: 50px;
      `;
    } else {
      return css`
        padding-top: 50px;
      `;
    }
  }
  return css`
    padding: 16px;
  `;
};

const TodoContainer = styled.div<StyledTodoProps>`
  padding: ${({ theme }) => theme.layout.listPadding};
  transition: 0.5s all ease;
  ${props => marginByPosition(props)};
  background-color: rgba(0, 0, 0, 0);
`;

const TodoContent = styled.div`
  box-shadow: ${({ theme }) => theme.layout.dropShadow};
  color: ${({ theme }) => theme.color.todoFont};
  border-radius: ${({ theme }) => theme.layout.radius};
  background-color: ${({ theme }) => theme.color.whiteBackground};
  padding: ${({ theme }) => theme.layout.listPadding};
  border: 1px solid ${({ theme }) => theme.color.borderline};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoOption = styled.div`
  display: flex;
  align-items: center;
`;

const TodoDesc = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    padding-top: 5px;
    font-size: ${({ theme }) => theme.layout.fontSizeSmall};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.layout.formMargin};
  :hover {
    color: ${({ theme }) => theme.color.green};
    transform: scale(1.1);
    transition: all 0.5s;
  }
`;

export default React.memo(Todo);
