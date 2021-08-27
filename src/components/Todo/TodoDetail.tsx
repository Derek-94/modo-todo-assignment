import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import Label from 'components/common/Label';
import useForm from 'hooks/useForm';
import { Itodo, PriorityType } from 'types';
import { dateFormatString } from 'utils/date';

interface DetailProps {
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
  todo: Itodo;
  priorityTransfer: (type?: PriorityType) => ReactNode;
}

type InputElement = HTMLInputElement | HTMLTextAreaElement;

const TodoDetail: React.FC<DetailProps> = ({
  todo,
  setTodoState,
  priorityTransfer,
}) => {
  const { formData, onFormChange } = useForm<Itodo>(todo);
  const [memoUpdate, setMemoUpdate] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState(false);

  const handlerChange = (e: React.ChangeEvent<InputElement>) => {
    onFormChange(e);
  };
  const saveDate = () => {
    setTodoState(prev =>
      prev.map(state => {
        if (state.id === todo.id) {
          return {
            ...state,
            ...formData,
            updatedAt: dateFormatString(new Date()),
          };
        }
        return state;
      })
    );
    setMemoUpdate(false);
    setTitleUpdate(false);
  };

  const handlerTitleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.code === 'Escape') {
      setTitleUpdate(false);
    }
    if (e.code === 'Enter') {
      saveDate();
    }
  };

  const handlerMemoKeyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.code === 'Escape') {
      setMemoUpdate(false);
    }
    if (e.code === 'Enter' && e.ctrlKey) {
      saveDate();
    }
  };

  return (
    <>
      {titleUpdate ? (
        <TitleEditor
          autoFocus
          name="taskName"
          value={formData.taskName || ''}
          onKeyDown={handlerTitleKeyEvent}
          onChange={handlerChange}
          onBlur={() => setTitleUpdate(false)}
        ></TitleEditor>
      ) : (
        <Title onDoubleClick={() => setTitleUpdate(true)}>
          {todo.taskName}
        </Title>
      )}
      <TodoDate>
        <p>생성일 : {todo.createdAt}</p>
        {todo.createdAt !== todo.updatedAt && <p>수정일 : {todo.updatedAt}</p>}
      </TodoDate>
      <TodoMemoContainer>
        {memoUpdate ? (
          <MemoEditor
            placeholder="ctrl + Enter 를 이용하여 메모를 저장합니다"
            autoFocus
            name="memo"
            value={formData.memo || ''}
            onKeyDown={handlerMemoKeyEvent}
            onChange={handlerChange}
            onBlur={() => setTitleUpdate(false)}
          />
        ) : (
          <TodoMemo onDoubleClick={() => setMemoUpdate(true)}>
            {todo.memo || (
              <MemoPlaceholder>
                <p>메모가 없습니다</p>
                <p>더블클릭하여 메모를 남기거나 수정할 수 있습니다</p>
                <p>제목도 더블클릭하여 수정할 수 있습니다</p>
              </MemoPlaceholder>
            )}
          </TodoMemo>
        )}
      </TodoMemoContainer>

      <p>
        중요도 :{' '}
        {
          <Label priority={todo.priority}>
            {priorityTransfer(todo.priority)}
          </Label>
        }
      </p>
      <p>완료 예정일 : {todo.dueDate}</p>
    </>
  );
};

const TitleEditor = styled.input`
  text-align: left;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  width: 100%;
  font-size: 14px;
  margin: 10px;
  padding: 14px;
`;
const Title = styled.h1`
  padding: 24px;
  text-align: center;
`;
const MemoPlaceholder = styled.div`
  font-size: 14px;
  color: #b9b9b9;
  text-align: left;
`;
const TodoMemo = styled.div`
  padding: 8px;
  width: 100%;
  height: 100%;
  border: 0.5px solid #aaaaaa;
  white-space: pre-line;
`;
const MemoEditor = styled.textarea`
  width: 100%;
  height: 100%;
`;
const TodoDate = styled.div`
  text-align: right;
`;
const TodoMemoContainer = styled.div`
  height: 150px;
  line-height: 1.5;
  margin: 10px 0;
`;
export default TodoDetail;
