import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  min-width: 280px;
  height: 40px;
  max-width: 500px;
  background: var(--_primaryWhiteColor);
  border-radius: 6px;
  outline: 0;
  padding: 8px 24px 8px 16px;
  border: 1px solid;
  border-color: var(--_primaryWhiteColor);
  color: var(--_primaryTextColor);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  &::placeholder {
    color: var(--_disabledTextColor);
  }
`;
