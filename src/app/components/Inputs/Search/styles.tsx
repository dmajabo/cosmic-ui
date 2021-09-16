import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputSearch = styled.input`
  min-width: 280px;
  height: 40px;
  max-width: 500px;
  background: var(--_primaryButtonBg);
  border-radius: 6px;
  outline: 0;
  padding: 8px 24px 8px 16px;
  border: 1px solid;
  border-color: var(--_primaryButtonBg);
  color: var(--_primaryColor);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  &::placeholder {
    color: var(--_disabledTextColor);
  }
`;
