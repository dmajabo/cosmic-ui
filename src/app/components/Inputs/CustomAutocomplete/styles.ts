/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const AutoCompleteWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  min-height: 72px;
  & .MuiAutocomplete-root {
    height: auto;
    font-family: 'DMSans';
    background: var(--_primaryBg);
    border-radius: 6px;
    border: 1px solid var(--_defaultInputBorder);
    min-height: 50px;
  }
  & .MuiOutlinedInput-root {
    color: var(--_primaryTextColor);
    font-size: 14px;
    font-family: inherit;
    font-weight: 500;
    line-height: normal;
    letter-spacing: unset;
    border-radius: 6px;
    padding-bottom: 0px !important;
    padding-left: 20px !important;
    padding-top: 0px !important;
    min-height: 50px;
    border: none;
  }
  & .MuiAutocomplete-input {
    min-height: 100%;
    width: 100%;
    padding: 10px 8px 10px 0px !important;
    height: auto;
    align-self: normal;
  }
  & .MuiAutocomplete-endAdornment {
    top: calc(50% - 10px);
  }
  & .MuiAutocomplete-endAdornment .MuiIconButton-root {
    padding: 0px !important;
    width: 20px;
    height: 20px;
    margin: auto 4px;
    display: inline-flex;
    &:hover {
      background: transparent !important;
    }
    & svg {
      width: 12px;
      height: 12px;
      margin: auto;
    }
  }
  & .MuiTouchRipple-root {
    display: none;
  }
  & .MuiOutlinedInput-notchedOutline {
    display: none;
  }
`;

export const TagItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  height: 22px;
  padding: 2px 10px;
  margin: 3px 6px 3px 0 !important;
  background: var(--_vmBg);
`;

export const Tag = styled.span`
  color: var(--_primaryTextColor);
  font-size: 11px;
  line-height: 10px;
  font-style: normal;
  font-family: 'DMSans';
  font-weight: 500;
  margin: auto 6px auto 0;
`;
