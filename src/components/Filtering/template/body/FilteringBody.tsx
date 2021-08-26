import React from 'react';
import styled from 'styled-components';
import { MENU } from 'constant';
import { ClickObj, PriorityType, FilterReducer } from 'types';

interface FilteringBodyProps {
  handlerFiltering: (type: FilterReducer, action?: PriorityType) => void;
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
  const handlerOrigin = () => {
    handlerFiltering('INIT');
  };
  const handlerDeadline = () => {
    handlerFiltering('DEADLINE');
  };
  return (
    <FilteringBodyBlock>
      <Btn check={!click.deadline && !click.priority} onClick={handlerOrigin}>
        {MENU.FILTER[0]}
      </Btn>
      <Btn onClick={handlerDeadline} check={click.deadline}>
        {MENU.FILTER[1]}
      </Btn>
      <Btn onClick={handlerDropdown} check={click.priority ? true : false}>
        {click.priority || MENU.FILTER[2]}
      </Btn>
      <DropMenu checkDropdown={dropdownOpen}>
        {MENU.PRIORITY.map((priority, idx) => (
          <span
            onClick={() => handlerFiltering('PRIORITY', priority)}
            key={idx}
          >
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

const Btn = styled.button<{ check: boolean }>`
  background-color: ${props => (props.check ? '#dd346c' : '#fafafa')};
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
