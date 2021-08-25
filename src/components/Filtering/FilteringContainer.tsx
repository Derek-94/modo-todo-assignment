import React from 'react';
import styled from 'styled-components';
import { ClickObj } from 'types';

import FilteringHead from 'components/Filtering/template/head/FilteringHead';
import FilteringBody from 'components/Filtering/template/body/FilteringBody';

interface FilteringContainerProps {
  handlerFiltering: (target: string) => void;
  handlerDrop: () => void;
  open: boolean;
  click: ClickObj;
}

const FilteringContainer: React.FC<FilteringContainerProps> = ({
  handlerFiltering,
  handlerDrop,
  open,
  click,
}) => {
  return (
    <FilteringWrapper>
      <FilteringHead />
      <FilteringBody
        handlerFiltering={handlerFiltering}
        handlerDrop={handlerDrop}
        open={open}
        click={click}
      />
    </FilteringWrapper>
  );
};

export default FilteringContainer;

const FilteringWrapper = styled.div`
  top: 100px;
  min-height: 80px;
  position: relative;
  background: white;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
