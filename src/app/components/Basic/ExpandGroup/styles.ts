import styled from 'styled-components';

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  height: auto;
  min-height: 40px;
  border: none;
  border-bottom: 1px solid var(--_borderColor);
  flex-wrap: nowrap;
`;

interface HeaderProps {
  disabled?: boolean;
}
export const GroupHeader = styled.div<HeaderProps>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  padding: 20px 0;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  * svg {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;

export const GroupLabel = styled.div`
  display: inline-block;
  max-width: 100%;
  flex-shrink: 0;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--_disabledTextColor);
  margin: auto 12px auto 0;
  white-space: nowrap;
`;

interface ContentWrapperProps {
  maxHeight?: string;
  margin: string;
}
export const ContentWrapper = styled.div<ContentWrapperProps>`
  max-height: ${props => props.maxHeight || '400px'};
  margin: ${props => props.margin || '0'};
  overflow-y: auto;
  overflow-x: hidden;
`;
