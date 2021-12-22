import styled from 'styled-components';
import { AccountStatus } from 'lib/api/ApiModels/Accounts/apiModel';
import { device_L } from 'styles/global-styles';

export const AccountItemWrapper = styled.div`
  font-family: 'DMSans';
  font-style: normal;
  width: auto;
  flex: 1 1 auto;
  max-width: 500px;
  min-width: 360px;
  height: 240px;
  margin: 0 20px 20px 0;
  background: var(--_primaryBg);
  padding: 20px;
  border-radius: 6px;
  & .visibleOnHover {
    display: none;
  }
  &:hover .visibleOnHover {
    display: inline-block;
  }
  @media (max-width: ${device_L - 1 + 'px'}) {
    max-width: 100%;
  }
`;

export const AccountItemHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 8px;
  height: 48px;
  position: relative;
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
