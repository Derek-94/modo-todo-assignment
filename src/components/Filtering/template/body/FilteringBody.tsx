import React from 'react';
import styled from 'styled-components';
import { MENU } from 'constant';
import { ClickObj } from 'types';

interface FilteringBodyProps {
  handlerFiltering: (target: string) => void;
  handlerDropdown: () => void;
  dropdownOpen: boolean;
  click: ClickObj;
}

const FilteringBody: React.FC<FilteringBodyProps> = ({
  handlerFiltering,
  handlerDropdown,
  dropdownOpen,
  click,
}) => {
  return (
    <FilteringBodyBlock>
      <OriginBtn
        onClick={() => handlerFiltering(MENU.FILTER[0])}
        originCheck={click.origin}
      >
        {MENU.FILTER[0]}
      </OriginBtn>
      <DeadlineBtn
        onClick={() => handlerFiltering(MENU.FILTER[1])}
        deadlineCheck={click.deadline}
      >
        {MENU.FILTER[1]}
      </DeadlineBtn>
      <PriorityBtn onClick={handlerDropdown} priorityCheck={click.priority}>
        {click.priorityTarget || MENU.FILTER[2]}
      </PriorityBtn>
      <DropMenu checkDropdown={dropdownOpen}>
        {MENU.PRIORITY.map((priority, idx) => (
          <span onClick={() => handlerFiltering(priority)} key={idx}>
            {priority}
          </span>
        ))}
      </DropMenu>
    </FilteringBodyBlock>
  );
};

export default FilteringBody;

const FilteringBodyBlock = styled.div`
  display: flex;
  margin-left: 20px;

  button {
    cursor: pointer;
    margin-right: 15px;
  }
`;

const OriginBtn = styled.button<{ originCheck: boolean }>`
  background-color: ${props => (props.originCheck ? '#dd346c' : '#fafafa')};
`;
const PriorityBtn = styled.button<{ priorityCheck: boolean }>`
  background-color: ${props => (props.priorityCheck ? '#dd346c' : '#fafafa')};
  text-align: center;
`;
const DeadlineBtn = styled.button<{ deadlineCheck: boolean }>`
  background-color: ${props => (props.deadlineCheck ? '#dd346c' : '#fafafa')};
`;

const DropMenu = styled.div<{ checkDropdown: boolean }>`
  display: ${props => (props.checkDropdown ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  width: 100px;
  height: 80px;
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
  margin-left: 100px;
  margin-top: 25px;
  background-color: #fafafa;

  span {
    border: none;
    cursor: pointer;
    background-color: #fafafa;
    text-align: right;
    margin-right: 10px;

    &:hover {
      color: #dd346c;
    }
  }
`;
