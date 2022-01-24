import styled from 'styled-components';

export const StepButtonIcon = styled.span`
  display: inline-flex;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px;
  margin: 0 12px 0 0;
  background: var(--_highlightColor);
  span {
    margin: auto;
    font-weight: bold;
    font-family: 'DMSans';
    font-style: normal;
    font-size: 18px;
    line-height: 23px;
    color: var(--_primaryWhiteColor);
  }
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin: auto;
  }
`;

export const StepButtonLabel = styled.span`
  display: inline-block;
  max-width: calc(100% - 52px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: auto 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: var(--_primaryTextColor);
`;

export const StepButton = styled.button`
  outline: none;
  border: none;
  padding: 0 12px;
  height: 40px;
  max-width: 160px;
  background: transparent;
  flex-shrink: 0;
  display: inline-flex;
  cursor: pointer;
  &.completed {
    ${StepButtonIcon} {
      background: var(--_successColor);
    }
  }
  &.activeStep {
    cursor: default;
  }
  &:disabled {
    cursor: default;
    ${StepButtonIcon} {
      background: var(--_disabledTextColor);
    }
  }
`;
