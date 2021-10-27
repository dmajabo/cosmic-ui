import React from 'react';
import { Content, GetStartedButton, GetStartedWrapper, Labels, MainTitle, SecondaryTitle, SignInButton, SignInIcon, SignInText, SignInWrapper, Wrapper } from './styles';
import landingBg from 'app/images/landingBg.svg';
import history from 'utils/history';
import { ROUTE } from 'lib/Routes/model';
import AppLogoComponent from 'app/components/Basic/AppLogoComponent';
import ImgComponent from 'app/components/Basic/ImgComponent';
import { arrowSignIn } from 'app/components/SVGIcons/arrows';

const LandingPage: React.FC<{}> = () => {
  const onGoTo = (path: string) => {
    history.push(path);
  };

  return (
    <Wrapper>
      <ImgComponent styles={{ position: 'absolute', top: 0, left: 0 }} src={landingBg} alt="Okulis" />
      <Content>
        <AppLogoComponent />
        <Labels>
          <MainTitle>Reimagining hybrid enterprise network operations</MainTitle>
          <SecondaryTitle>We are in stealth</SecondaryTitle>
        </Labels>
        <GetStartedWrapper>
          <GetStartedButton onClick={() => onGoTo(ROUTE.signUp)}>Get Started</GetStartedButton>
        </GetStartedWrapper>
      </Content>
      <SignInWrapper>
        <SignInButton onClick={() => onGoTo(ROUTE.signUp)}>
          <SignInText>Sign in</SignInText>
          <SignInIcon>{arrowSignIn}</SignInIcon>
        </SignInButton>
      </SignInWrapper>
    </Wrapper>
  );
};

export default React.memo(LandingPage);
