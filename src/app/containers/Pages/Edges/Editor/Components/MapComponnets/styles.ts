import styled from 'styled-components';

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  padding: 0 10px 10px 10px;
  border-radius: 6px;
  background: var(--_primaryBg);
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
`;

interface HeaderProps {
  bg?: string;
}
export const NodeHeader = styled.div<HeaderProps>`
  background: ${props => props.bg || 'var(--_errorColor)'};
  width: 100%;
  height: 24px;
  border-radius: 0px 0px 6px 6px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NodeName = styled.span`
  font-size: 10px;
  line-height: 13px;
  color: var(--_primaryTextColor);
`;

export const GroupName = styled.div`
  font-size: 14px;
  line-height: 16px;
  height: 18px;
  text-align: center;
  color: var(--_primaryColor);
  margin: 14px 0;
  flex-shrink: 0;
`;

export const NodeText = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
  line-height: 10px;
  color: var(--_disabledTextColor);
  margin: 0 auto;
  flex-shrink: 0;
`;

export const Office = styled.div`
  background: var(--_vmBg);
  border-radius: 6px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: var(--_primaryColor);
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  height: 32px;
  padding: 8px;
  margin: 0 0 6px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
`;
