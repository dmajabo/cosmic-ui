import styled, { css } from 'styled-components';

export const TextInputWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  min-height: 70px;
`;
interface Props {
  disabled?: boolean;
  padding?: string;
  height?: string;
}

const InputStyles = css`
  width: 100%;
  background: var(--_primaryWhiteColor);
  border-radius: 6px;
  outline: 0;
  border: 1px solid;
  border-color: var(--_defaultInputBorder);
  color: var(--_primaryTextColor);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  &::placeholder {
    color: var(--_disabledTextColor);
  }
  &:read-only {
    cursor: default;
    color: var(--_disabledTextColor);
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    background: transparent;
  }
  &.invalid {
    border-color: var(--_errorColor);
  }
`;
export const Input = styled.input<Props>`
  ${InputStyles};
  height: ${props => props.height || '50px'};
  padding: ${props => props.padding || '8px 24px 8px 16px'};
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const TextArea = styled.textarea<Props>`
  ${InputStyles};
  height: 172px;
  padding: 20px;
  resize: none;
  display: block;
`;

export const TagsWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 40px;
  background: var(--_primaryWhiteColor);
  border-radius: 6px;
  outline: 0;
  border: 1px solid;
  border-color: var(--_defaultInputBorder);
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const TagsInput = styled.input`
  ${InputStyles}
  height: 30px;
  line-height: 16px;
  width: auto;
  min-width: 100px;
  max-width: 100%;
  padding: 3px 8px;
  background: transparent;
  outline: 0;
  border: none;
  margin: 3px 6px 3px 0;
  border-radius: 4px;
`;

export const Tag = styled.span`
  display: inline-flex;
  width: auto;
  height: 30px;
  max-width: 100%;
  position: relative;
  border-radius: 6px;
  outline: 0;
  border: none;
  padding: 9px 12px;
  margin: 3px 6px 3px 0;
`;

export const TagBg = styled.span`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--_successColor);
  opacity: 0.1;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  z-index: 1;
`;

export const TagText = styled.span`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1em;
  margin-right: 12px;
  color: var(--_successColor);
  z-index: 2;
`;
