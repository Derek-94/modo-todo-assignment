import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { Itodo, PriorityType } from 'types';
import { dateFormatString } from 'utils/date';
import uuidv4 from 'utils/getUuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TodoWrapperProps {
  onAddTodo: (newTodo: Itodo) => void;
}

const TodoForm: React.FC<TodoWrapperProps> = ({ onAddTodo }) => {
  const [validationError, setValidationError] = useState<boolean>(false);
  const [inputTodo, setInputTodo] = useState<string>('');
  const [priority, setPriority] = useState<PriorityType>('');
  const [dueDate, setDueDate] = useState<Date>(new Date());

  useEffect(() => {
    if (validationError) {
      setTimeout(() => {
        setValidationError(false);
      }, 2000);
    }
  }, [validationError]);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setInputTodo(e.currentTarget.value);
  };

  const onChangePriority: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setPriority(e.target.value as PriorityType);
  };

  const onRegisterTodo: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    if (inputTodo.length === 0 || priority === '') {
      onValidationCheck(true);
    } else {
      onValidationCheck(false);
      setInputTodo('');
      onAddTodo({
        id: uuidv4(),
        taskName: inputTodo,
        status: 'Todo',
        priority: priority,
        createdAt: dateFormatString(new Date()),
        dueDate: dateFormatString(dueDate as Date),
      });
    }
  };

  const onValidationCheck = (validCheck: boolean) => {
    setValidationError(validCheck);
  };

  return (
    <>
      <Form>
        <Input
          required
          value={inputTodo}
          onChange={onChangeInput}
          placeholder="할 일을 적어주세요!"
        />
        <TodoDatePick
          selected={dueDate}
          onChange={date => setDueDate(date as Date)}
          placeholderText="완료 목표일을 적어주세요!"
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
        {validationError && (
          <ErrorMessage>
            위 항목 중 선택하지 않은 것이 있습니다. 😥
          </ErrorMessage>
        )}
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  position: relative;
`;

const Input = styled.input`
  min-width: 300px;
  padding: ${({ theme }) => theme.layout.padding};
  background-color: ${({ theme }) => theme.color.whiteBackground};
  border-radius: ${({ theme }) => theme.layout.radius};
  font-weight: ${({ theme }) => theme.layout.fontBold};
`;

const TodoDatePick = styled(DatePicker)`
  padding: ${({ theme }) => theme.layout.padding};
  background-color: ${({ theme }) => theme.color.whiteBackground};
  margin-left: ${({ theme }) => theme.layout.formMargin};
  border-radius: ${({ theme }) => theme.layout.radius};
  cursor: pointer;
`;

const Select = styled.select`
  margin: ${({ theme }) => theme.layout.formMargin};
  padding: ${({ theme }) => theme.layout.padding};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.layout.radius};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.headerFont};
  display: flex;
  justify-content: center;
  margin: 10px;
  font-weight: ${({ theme }) => theme.layout.fontBold};
  font-size: 18px;
  position: absolute;
  bottom: -30px;
  text-align: center;
`;

export default TodoForm;
