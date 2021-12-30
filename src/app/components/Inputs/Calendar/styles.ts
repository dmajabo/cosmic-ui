import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
  .DatePicker {
    font-size: 1px;
    line-height: normal;
    .Calendar__header {
      padding: 20px;
      font-size: 8px;
      button {
        margin: auto;
        padding: 0;
      }
    }
    .Calendar__weekDays,
    .Calendar__section {
      padding: 0 20px;
    }
  }
`;

export const DisplayedDaySpan = styled.span`
  color: inherit;
  margin: auto;
`;

export const DisplayedDay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 15px;
  color: var(--_primaryTextColor);
  background: var(--_primaryWhiteColor);
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  transition: all 0.2s;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  &:hover {
    /* background: var(--_hoverButtonBg); */
    border-color: var(--_hoverButtonBg);
    color: var(--_hoverButtonBg);
  }
  ${DisplayedDaySpan} {
    &:first-child {
      margin-bottom: 0;
    }
    &:last-child {
      margin-top: 0;
    }
  }
`;
