import styled from 'styled-components';
import { Icon } from '../Buttons/IconWrapper/styles';

export const CardWrapper = styled.div`
  display: flex;
  width: calc(100% / 3 - 15px); // calc(100% / 5 - 15px);
  min-width: 160px;
  height: 140px;
  border-radius: 6px;
  background: var(--_primaryBg);
  padding: 20px;
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
`;

export const IconWrapStyles = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  background: var(--_appBg);
  margin-right: 30px;
  border-radius: 4px;
  ${Icon} {
    margin: auto;
  }
`;
export const ContentWrapStyles = styled.div`
  max-width: calc(100% - 130px);
  overflow: hidden;
`;

export const Label = styled.div`
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: var(--_primaryColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ValueProps {
  color?: string;
}
export const ValueStyles = styled.div<ValueProps>`
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 78px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.color || 'var(--_primaryColor)'};
`;
