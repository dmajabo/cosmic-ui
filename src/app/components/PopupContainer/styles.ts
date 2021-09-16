import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
}
export const Wrapper = styled.div<Props>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  background: var(--_primaryBg);
  box-shadow: 0px 15px 50px rgba(132, 141, 163, 0.15);
  border-radius: 6px;
`;

export const PopupLinkItem = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: var(--_primaryColor);
  padding: 24px;
  cursor: pointer;
`;
