import styled, { css } from 'styled-components';

export const Label = styled.label`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  display: inline-flex;
  margin: 0 auto 12px 0;
  cursor: pointer;
  width: auto;
  min-height: 20px;
  align-items: center;
  flex-grow: 0;
  span.labelValue {
    color: var(--_disabledTextColor);
  }
  .Mui-checked + span.labelValue {
    color: var(--_primaryColor);
  }
  input:hover:not(:disabled) ~ & {
    opacity: 1;
    background-color: var(--_primaryBg);
    border-color: var(--_highlightColor);
    box-shadow: 0px 4px 7px rgba(67, 127, 236, 0.15);
  }
  // '.Mui-focusVisible &': {
  //   outline: '2px auto rgba(19,124,189,.6)',
  //   outlineOffset: 2,
  // },
  // 'input:disabled ~ &': {
  //   boxShadow: 'none',
  //   background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  // },
`;

const icon = css`
  opacity: 0.4;
  width: 15px;
  height: 15px;
  box-shadow: none;
  border: 3px solid;
  border-color: var(--_disabledTextColor);
  border-radius: 50%;
  background-color: var(--_disabledTextColor);
  background-image: none;
`;

export const BpIcon = styled.span`
  ${icon};
`;

export const BpCheckedIcon = styled.span`
  ${icon};
  opacity: 1;
  background-color: var(--_primaryBg);
  border-color: var(--_highlightColor);
  box-shadow: 0px 4px 7px rgba(67, 127, 236, 0.15);
`;
