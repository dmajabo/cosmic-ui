import React from 'react';
import { logoBig } from 'app/components/SVGIcons/pagesIcons/logo';
import { LogoLabel, Logo, LogoWrapper } from './styles';

interface Props {}

const AppLogoComponent: React.FC<Props> = (props: Props) => {
  return (
    <LogoWrapper>
      <Logo>{logoBig}</Logo>
      <LogoLabel>Okulis</LogoLabel>
    </LogoWrapper>
  );
};

export default React.memo(AppLogoComponent);
