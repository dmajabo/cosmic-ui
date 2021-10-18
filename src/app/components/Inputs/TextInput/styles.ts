import styled, { css } from 'styled-components';

export const TextInputWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  min-height: 60px;
`;
interface Props {
  disabled?: boolean;
}

const InputStyles = css`
  width: 100%;
  background: var(--_primaryButtonBg);
  border-radius: 6px;
  outline: 0;
  border: 1px solid;
  border-color: var(--_defaultInputBorder);
  color: var(--_primaryColor);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  &::placeholder {
    color: var(--_disabledTextColor);
  }
`;
export const Input = styled.input<Props>`
  ${InputStyles};
  height: 40px;
  padding: 8px 24px 8px 16px;
`;

export const TextArea = styled.textarea<Props>`
  ${InputStyles};
  height: 172px;
  padding: 20px;
  resize: none;
`;
