import React, { useState } from 'react';
import { Itodo } from 'types';
import styled from 'styled-components';
import useForm from 'hooks/useForm';

interface DetailProps {
  setTodoState: React.Dispatch<React.SetStateAction<Itodo[]>>;
  todo: Itodo;
}

type InputElement = HTMLInputElement | HTMLTextAreaElement;

const TodoDetail: React.FC<DetailProps> = ({ todo, setTodoState }) => {
  const { formData, onFormChange } = useForm<Itodo>(todo);
  const [isUpdated, setIsUpdate] = useState(false);
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
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
          };
        }
        return state;
      })
    );
    setIsUpdate(false);
    setIsTitleUpdated(false);
  };
  const handlerInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.code === 'Escape') {
      setIsTitleUpdated(false);
    }
    if (e.code === 'Enter') {
      saveDate();
    }
  };
  const handlerTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.code === 'Enter' && e.ctrlKey) {
      setTodoState(prev =>
        prev.map(state => {
          if (state.id === todo.id) {
            return {
              ...state,
              ...formData,
            };
          }
          return state;
        })
      );
      setIsUpdate(false);
      setIsTitleUpdated(false);
    }
  };
  return (
    <div>
      {isTitleUpdated ? (
        <TitleEditor
          autoFocus
          name="taskName"
          value={formData.taskName || ''}
          onKeyDown={handlerInputKeyDown}
          onChange={handlerChange}
          onBlur={() => setIsTitleUpdated(false)}
        ></TitleEditor>
      ) : (
        <Title onDoubleClick={() => setIsTitleUpdated(true)}>
          {todo.taskName}
        </Title>
      )}
      <TodoDate>
        <p>createdAt:{todo.createdAt}</p>
        <p>updatedAt:{todo.updatedAt}</p>
      </TodoDate>
      <TodoMemoContainer>
        {isUpdated ? (
          <MemoEditor
            placeholder="ctrl + Enter 를 이용하여 메모를 저장합니다"
            autoFocus
            name="memo"
            value={formData.memo || ''}
            onKeyDown={handlerTextareaKeyDown}
            onChange={handlerChange}
            onBlur={() => setIsTitleUpdated(false)}
          />
        ) : (
          <TodoMemo onDoubleClick={() => setIsUpdate(true)}>
            {todo.memo || (
              <MemoPlaceholder>
                <p>메모가 없습니다</p>
                <p>더블클릭하여 메모를 남기거나 수정할 수 있습니다</p>
              </MemoPlaceholder>
            )}
          </TodoMemo>
        )}
      </TodoMemoContainer>

      <p>중요도 : {todo.priority}</p>
      <p>완료 예정일 : {todo.dueDate}</p>
    </div>
  );
};
const TitleEditor = styled.input`
  text-align: left;
  border: 1px solid #cccccc;
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
`;
export default TodoDetail;
