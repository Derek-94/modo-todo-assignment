import React from 'react';
import styled from 'styled-components';
import FilteringHead from 'components/Filtering/template/head/FilteringHead';
import FilteringBody from 'components/Filtering/template/body/FilteringBody';
import { ClickObj, PriorityType, FilterReducer } from 'types';

interface FilteringContainerProps {
  handlerFiltering: (type: FilterReducer, action?: PriorityType) => void;
  handlerDropdown: () => void;
  dropdownOpen: boolean;
  filterOpt: ClickObj;
}

const FilteringContainer: React.FC<FilteringContainerProps> = ({
  handlerFiltering,
  handlerDropdown,
  dropdownOpen,
  filterOpt,
}) => {
  return (
    <FilteringWrapper>
      <FilteringHead />
      <FilteringBody
        handlerFiltering={handlerFiltering}
        handlerDropdown={handlerDropdown}
        dropdownOpen={dropdownOpen}
        filterOpt={filterOpt}
      />
    </FilteringWrapper>
  );
};

export default FilteringContainer;

const FilteringWrapper = styled.div`
  min-height: 55px;
  position: relative;
  background-color: ${({ theme }) => theme.color.whiteBackground};
  margin: 80px 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${({ theme }) => theme.layout.radius};
`;
