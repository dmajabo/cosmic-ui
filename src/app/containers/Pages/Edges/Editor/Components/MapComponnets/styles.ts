import styled from 'styled-components';

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 96px);
  height: auto;
  flex-shrink: 0;
  padding: 0 10px 10px 10px;
  margin: auto 48px;
  border-radius: 6px;
  background: var(--_primaryBg);
  font-family: 'DMSans';
  font-style: normal;
  font-weight: 500;
`;

interface NameProps {
  bg?: string;
}
export const NodeHeader = styled.div<NameProps>`
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
  line-height: 18px;
  text-align: center;
  color: var(--_primaryColor);
  margin: 14px 0;
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
  &:last-child {
    margin-bottom: 0;
  }
`;
