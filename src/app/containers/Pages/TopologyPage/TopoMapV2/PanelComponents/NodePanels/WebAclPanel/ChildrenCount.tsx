import React from 'react';
import styled from 'styled-components';

const CountStyles = styled.div`
  height: 20px;
  width: auto;
  min-width: 34px;
  max-width: 100px;
  padding: 0 10px;
  background: var(--_pButtonBg);
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  color: var(--_primaryWhiteColor);
  margin: auto 12px auto auto;
  border-radius: 20px;
  flex-shrink: 0;
  display: inline-flex;
  span {
    display: inline-block;
    margin: auto;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

interface Props {
  count: number;
}

const ChildrenCount: React.FC<Props> = ({ count }) => {
  return (
    <CountStyles>
      <span>{count}</span>
    </CountStyles>
  );
};
export default React.memo(ChildrenCount);
