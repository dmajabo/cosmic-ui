import styled from 'styled-components';

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
export const Input = styled.input<Props>`
  height: 40px;
  width: 100%;
  background: var(--_primaryButtonBg);
  border-radius: 6px;
  outline: 0;
  padding: 8px 24px 8px 16px;
  border: 1px solid;
  border-color: var(--_disabledButtonColor);
  color: var(--_primaryColor);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  &::placeholder {
    color: var(--_disabledTextColor);
  }
`;
