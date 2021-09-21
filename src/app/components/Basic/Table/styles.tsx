import styled from 'styled-components';

export const TableWrapperStyles = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 20px;
  .highlightText {
    color: var(--_primaryColor);
  }
`;

export const TableHeaderStyles = styled.div`
  display: flex;
  margin-bottom: 8px;
  text-transform: capitalize;
  color: var(--_primaryColor);
  font-size: 12px;
  font-weight: 700;
`;
