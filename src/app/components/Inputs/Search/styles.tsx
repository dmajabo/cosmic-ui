import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: auto;
  min-width: 280px;
  max-width: 500px;
  height: 40px;
`;

export const InputSearch = styled.input`
  width: 100%;
  height: 100%;
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
