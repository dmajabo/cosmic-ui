import styled, { css } from 'styled-components';

const tagStyles = css`
  display: inline-flex;
  align-content: center;
  max-width: 240px;
  min-width: 80px;
  width: auto;
  height: 30px;
  border: none;
  background: var(--_interfaceBg);
  border-radius: 30px;
  padding: 6px 10px 6px 20px;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: var(--_primaryColor);
  &:last-child {
    margin-right: 0;
  }
`;

export const TagWrapper = styled.div`
  ${tagStyles};
  margin: 0 10px 10px 0;
`;

export const Label = styled.span`
  display: inline-block;
  max-width: calc(100% - 20px);
  margin-right: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const HeaderTagWrapper = styled.div`
  ${tagStyles};
  margin: auto 10px auto 0;
  overflow: hidden;
`;

export const HighLightLabel = styled.span`
  display: inline-block;
  max-width: calc(100% - 20px);
  margin-right: 4px;
`;

export const SubLabel = styled.span`
  display: inline-block;
  max-width: calc(100% - 20px);
  color: var(--_disabledTextColor);
`;
