import { AccountStatus } from 'lib/api/ApiModels/Accounts/apiModel';
import styled from 'styled-components';

export const AccountItemWrapper = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  flex-shrink: 0;
  width: calc(100% / 4 - 60px / 4);
  /* max-width: 420px; */
  height: 240px;
  margin: 0 20px 20px 0;
  background: var(--_primaryBg);
  padding: 20px;
  border-radius: 6px;
  &:nth-child(4n) {
    margin-right: 0;
  }
`;

export const AccountItemHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 8px;
  height: 48px;
`;

export const AccountItemTitle = styled.span`
  display: inline-block;
  margin: auto 0;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryColor);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 64px);
`;

export const AccountItemFooter = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  margin-top: 8px;
  height: 40px;
`;

export const AccountItemDescription = styled.div`
  height: calc(100% - 106px);
  width: 100%;
  overflow: hidden;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: var(--_disabledTextColor);
`;

interface StatusProps {
  state: AccountStatus;
}

const getStatusColor = (state: AccountStatus): string => {
  if (state === AccountStatus.CONNECTED) return 'var(--_successColor)';
  if (state === AccountStatus.DISCONNECTED) return 'var(--_errorColor)';
  return 'var(--_disabledTextColor)';
};

export const StatusWrapper = styled.div<StatusProps>`
  display: inline-flex;
  flex-shrink: 0;
  margin: auto auto auto 0;
  padding-right: 12px;
  color: ${props => getStatusColor(props.state)};
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const StatusLabel = styled.span`
  display: inline-block;
  color: inherit;
`;
