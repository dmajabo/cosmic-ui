import styled from 'styled-components';

export const PopupItemWrapper = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  padding: 7px 20px;
  height: 40px;
  background: var(--_primaryBg);
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: var(--_primaryTextColor);
  cursor: pointer;
  &:hover {
    background: var(--_vmBg);
  }
`;

export const Label = styled.span`
  margin: auto 0;
`;
