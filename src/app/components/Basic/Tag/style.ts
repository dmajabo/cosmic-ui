import styled from 'styled-components';

interface Props {
  bgColor?: string;
  color?: string;
  isSubText?: boolean;
  opacity?: string | number;
}
export const TagStyles = styled.span`
  display: inline-flex;
  width: auto;
  height: 30px;
  max-width: 100%;
  position: relative;
  border-radius: 6px;
  outline: 0;
  border: none;
  padding: 9px 12px;
  margin: 3px 6px 3px 0;
`;

export const TagBg = styled.span<Props>`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background: ${props => props.bgColor || 'var(--_successColor)'};
  opacity: ${props => props.opacity || '0.1'};
  width: 100%;
  height: 100%;
  border-radius: 6px;
  z-index: 1;
`;

export const TagText = styled.span<Props>`
  display: inline-block;
  font-family: 'DMSans';
  font-style: normal;
  font-weight: ${props => (props.isSubText ? 'normal' : 'bold')};
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1em;
  margin-right: ${props => (props.isSubText ? '4px' : '12px')};
  color: ${props => props.color || 'var(--_successColor)'};
  z-index: 2;
`;
