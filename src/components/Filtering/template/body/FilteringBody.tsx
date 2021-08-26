import React from 'react';
import styled from 'styled-components';
import { MENU } from 'constant';
import { ClickObj, PriorityType, FilterReducer } from 'types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faListOl,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';

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
      <Btn onClick={handlerOrigin} title="초기화">
        <Icon icon={faClipboard} check={!click.deadline && !click.priority} />
      </Btn>
      <Btn onClick={handlerDeadline} title="마감임박">
        <Icon icon={faExclamationCircle} check={click.deadline} />
      </Btn>
      <Btn onClick={handlerDropdown} title="중요도">
        <Icon icon={faListOl} check={click.priority ? true : false} />
        <Priority1 checkPriority={click.priority || ''}></Priority1>
        <Priority3 checkPriority={click.priority || ''}></Priority3>
        <Priority2Top checkPriority={click.priority || ''}></Priority2Top>
        <Priority2Bot checkPriority={click.priority || ''}></Priority2Bot>
      </Btn>
      <DropMenu checkDropdown={dropdownOpen}>
        {MENU.PRIORITY.map((priority, idx) => (
          <span
            onClick={() => handlerFiltering('PRIORITY', priority)}
            key={idx}
          >
            {priority}({idx + 1})
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

const Btn = styled.button``;

const DropMenu = styled.div<{ checkDropdown: boolean }>`
  display: ${props => (props.checkDropdown ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  width: 100px;
  height: 80px;
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
  margin-left: 150px;
  margin-top: -15px;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  border-radius: 5px;

  span {
    border: none;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.whiteBackground};
    text-align: left;
    margin-left: 10px;
    font-weight: ${({ theme }) => theme.layout.fontBold};

    &:hover {
      color: #dd346c;
    }
  }
`;

const Icon = styled(FontAwesomeIcon)<{ check: boolean }>`
  cursor: pointer;
  font-size: 25px;
  color: ${props => (props.check ? '#dd346c' : '#dfdfdf')};
`;

const Priority1 = styled.div<{ checkPriority: string }>`
  display: ${props => (props.checkPriority === 'low' ? 'flex' : 'none')};
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  width: 40px;
  height: 20px;
  z-index: 100;
  margin-top: -16px;
`;

const Priority3 = styled.div<{ checkPriority: string }>`
  display: ${props => (props.checkPriority === 'high' ? 'flex' : 'none')};
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  width: 40px;
  height: 20px;
  z-index: 100;
  margin-top: -29px;
`;

const Priority2Top = styled.div<{ checkPriority: string }>`
  display: ${props => (props.checkPriority === 'medium' ? 'flex' : 'none')};
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  width: 40px;
  height: 12px;
  z-index: 100;
  margin-top: -29px;
`;

const Priority2Bot = styled.div<{ checkPriority: string }>`
  display: ${props => (props.checkPriority === 'medium' ? 'flex' : 'none')};
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  width: 40px;
  height: 12px;
  z-index: 100;
  margin-top: -8px;
`;
