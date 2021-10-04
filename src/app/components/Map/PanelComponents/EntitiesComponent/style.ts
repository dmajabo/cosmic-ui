import styled from 'styled-components';

interface Props {
  disabled?: boolean;
}
export const EntityItemWrapper = styled.div<Props>`
  display: flex;
  height: 60px;
  width: 100%;
  background: var(--_interfaceBg);
  border-radius: 6px;
  padding: 20px;
  align-items: center;
  margin-bottom: 10px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  * {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const EntityItemLabel = styled.div<Props>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: ${props => (props.disabled ? 'var(--_disabledTextColor)' : 'var(--_primaryColor)')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

// export const EntityItemWrapper = styled.div``;
