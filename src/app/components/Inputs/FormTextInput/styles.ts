import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: 84px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 1;
  color: var(--_defaultInputColor);
  margin-bottom: 8px;
`;

export const Required = styled.span`
  color: var(--_errorColor);
  font-size: 12px;
  margin-left: 4px;
`;

export const Input = styled.input`
  font-size: 16px;
  line-height: 1;
  color: var(--_defaultInputColor);
  margin-bottom: 8px;
  border-radius: 6px;
  border: 1px solid;
  border-color: var(--_defaultInputColor);
  outline: 0;
  background: var(--_primaryBg);
  height: 60px;
  margin-bottom: 8px;
  &::placeholder {
    color: var(--_defaultInputColor);
  }
`;

export const Error = styled.div`
  color: var(--_errorColor);
  font-size: 12px;
`;
