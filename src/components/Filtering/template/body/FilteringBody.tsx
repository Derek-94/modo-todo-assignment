import React from 'react';
import styled, { css } from 'styled-components';
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
  filterOpt: ClickObj;
}

const FilteringBody: React.FC<FilteringBodyProps> = ({
  handlerFiltering,
  handlerDropdown,
  dropdownOpen,
  filterOpt,
}) => {
  const handlerOrigin = () => {
    handlerFiltering('INIT');
  };
  const handlerDeadline = () => {
    handlerFiltering('DEADLINE');
  };

  return (
    <FilteringBodyBlock>
      <Btn onClick={handlerOrigin} title="필터링한 내용을 초기화합니다">
        <Icon
          icon={faClipboard}
          select={`${!filterOpt.deadline && !filterOpt.priority}`}
        />
      </Btn>
      <Btn
        onClick={handlerDeadline}
        title="마감날짜가 임박한 Todo를 보여드립니다"
      >
        <Icon
          icon={faExclamationCircle}
          select={filterOpt.deadline.toString()}
        />
      </Btn>
      <Btn onClick={handlerDropdown} title="중요도 순으로 정렬할 수 있습니다">
        <Icon icon={faListOl} select={filterOpt.priority ? true : false} />
        <PriorityLow checkPriority={filterOpt.priority || ''}></PriorityLow>
        <PriorityHigh checkPriority={filterOpt.priority || ''}></PriorityHigh>
        <PriorityMidTop
          checkPriority={filterOpt.priority || ''}
        ></PriorityMidTop>
        <PriorityMidBot
          checkPriority={filterOpt.priority || ''}
        ></PriorityMidBot>
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

const Icon = styled(FontAwesomeIcon)<{ select: boolean | string }>`
  cursor: pointer;
  font-size: 25px;
  color: ${props => (props.select === 'true' ? '#dd346c' : '#dfdfdf')};
`;

const PriorityProp = (margin: number, height: number, target: string) => css<{
  checkPriority: string;
}>`
  display: ${props => (props.checkPriority === `${target}` ? 'flex' : 'none')};
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  width: 40px;
  height: ${height}px;
  z-index: 100;
  margin-top: ${margin}px;
`;

const PriorityLow = styled.div`
  ${PriorityProp(-16, 20, 'low')}
`;

const PriorityHigh = styled.div`
  ${PriorityProp(-29, 20, 'high')}
`;

const PriorityMidTop = styled.div`
  ${PriorityProp(-29, 12, 'medium')}
`;

const PriorityMidBot = styled.div`
  ${PriorityProp(-8, 12, 'medium')}
`;
