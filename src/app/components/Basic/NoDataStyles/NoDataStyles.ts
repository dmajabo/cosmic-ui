import styled from 'styled-components';

export const EmptyDataStyles = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 42px);
  min-height: 46px;
  background: var(--_primaryBg);
`;

export const EmptyText = styled.div`
  margin: auto;
  text-align: center;
  font-size: 16px;
  color: var(--_disabledTextColor);
  text-transform: capitalize;
`;
