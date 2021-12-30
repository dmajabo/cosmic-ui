import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  max-height: 100%;
  margin: auto 0;
`;
export const ItemContainer = styled.div`
  margin-bottom: 32px;
  overflow: hidden;
  flex-shrink: 0;
  letter-spacing: 1px;
`;
export const ItemTitle = styled.div`
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0;
  color: var(--_primaryTextColor);
`;

export const ItemLink = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: var(--_sHoverButtonColor);
  a,
  a:visited,
  a:focus,
  a:active {
    color: inherit;
  }
`;

export const ItemValue = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: var(--_disabledTextColor);
`;
