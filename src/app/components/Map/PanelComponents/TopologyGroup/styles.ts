import styled from 'styled-components';

export const GroupWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 86px;
  background: var(--_interfaceBg);
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 20px;
  position: relative;
`;

export const Content = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 12px;
  padding: 0 24px 0 0;
  overflow: hidden;
`;

interface IField {
  primary?: boolean;
}
export const GroupField = styled.div<IField>`
  font-style: normal;
  font-weight: ${props => (props.primary ? '500' : 'normal')};
  font-size: ${props => (props.primary ? '16px' : '13px')};
  line-height: ${props => (props.primary ? '26px' : '17px')};
  color: ${props => (!props.primary ? 'var(--_disabledTextColor)' : 'var(--_primaryColor)')};
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${props => (props.primary ? '4px' : '0')};
`;
