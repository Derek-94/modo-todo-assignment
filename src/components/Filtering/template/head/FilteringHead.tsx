import React from 'react';
import styled from 'styled-components';

const FilteringHead: React.FC = () => {
  return <FilteringHeadBlock>Filtering</FilteringHeadBlock>;
};

export default FilteringHead;

const FilteringHeadBlock = styled.div`
  display: flex;
  margin-left: 20px;
`;
