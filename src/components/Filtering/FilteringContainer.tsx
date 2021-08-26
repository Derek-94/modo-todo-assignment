import React from 'react';
import styled from 'styled-components';
import { ClickObj } from 'types';

import FilteringHead from 'components/Filtering/template/head/FilteringHead';
import FilteringBody from 'components/Filtering/template/body/FilteringBody';

interface FilteringContainerProps {
  handlerFiltering: (target: string) => void;
  handlerDropdown: () => void;
  dropdownOpen: boolean;
  click: ClickObj;
}

const FilteringContainer: React.FC<FilteringContainerProps> = ({
  handlerFiltering,
  handlerDropdown,
  dropdownOpen,
  click,
}) => {
  return (
    <FilteringWrapper>
      <FilteringHead />
      <FilteringBody
        handlerFiltering={handlerFiltering}
        handlerDropdown={handlerDropdown}
        dropdownOpen={dropdownOpen}
        click={click}
      />
    </FilteringWrapper>
  );
};

export default FilteringContainer;

const FilteringWrapper = styled.div`
  min-height: 55px;
  position: relative;
  background: white;
  margin: 10px 0px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
