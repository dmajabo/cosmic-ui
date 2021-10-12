import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  width: calc(100% / 3 - 40px / 3);
  height: 110px;
  border: 1px solid;
  background: var(--_chartBg);
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  margin: 0 20px 20px 0;
  padding: 32px 30px;
  flex-shrink: 0;
  font-family: 'DMSans';
  cursor: pointer;
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export const Label = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: var(--_primaryColor);
  max-width: 100%;
  white-space: normal;
  margin: auto auto auto 0;
  line-height: 23px;
  max-height: 46px;
  overflow: hidden;
`;

export const SelectedWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  flex-shrink: 0;
  margin: auto 0 auto 12px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--_successColor);
`;

export const SelectedLabel = styled.span``;
