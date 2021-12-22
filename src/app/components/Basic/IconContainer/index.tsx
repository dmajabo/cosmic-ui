import React from 'react';
import styled from 'styled-components';

interface StProps {
  width?: string;
  height?: string;
  bgColor?: string;
}
const Wrapper = styled.div<StProps>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${props => props.width || '50px'};
  height: ${props => props.height || '50px'};
  background: ${props => props.bgColor || 'var(--_appBg)'};
  border-radius: 4px;
`;
const Icon = styled.div<StProps>`
  width: ${props => props.width || '25px'};
  height: ${props => props.height || '25px'};
  background: transparent;
  margin: auto;
  svg {
    vertical-align: top;
  }
`;

interface Props {
  icon: any;
  width?: string;
  height?: string;
  bgColor?: string;
  iconWidth?: string;
  iconHeight?: string;
  styles?: Object;
}

const IconContainer: React.FC<Props> = ({ icon, width, height, bgColor, iconWidth, iconHeight, styles }) => {
  return (
    <Wrapper style={styles} width={width} height={height} bgColor={bgColor}>
      <Icon width={iconWidth} height={iconHeight}>
        {icon}
      </Icon>
    </Wrapper>
  );
};
export default React.memo(IconContainer);
