import styled, { css } from 'styled-components';
import { Logo, LogoWrapper, LogoLabel } from 'app/components/Basic/AppLogoComponent/styles';
import { device_L, device_M, device_SM, device_XXL } from 'styles/global-styles';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  background: var(--_primaryTextColor);
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Content = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  color: var(--_primaryWhiteColor);
  width: 60vw;
  z-index: 1;
  ${LogoWrapper} {
    margin: 0 auto 6.25vw auto;
  }
  ${Logo} {
    width: 4.375vw;
    height: 4.375vw;
    flex-shrink: 0;
    margin-right: 1.041666666666667vw;
  }
  ${LogoLabel} {
    font-size: 3vw;
  }
  @media (max-width: ${device_L + 'px'}) {
    width: 70vw;
  }
  @media (max-width: ${device_M + 'px'}) {
    width: 80vw;
  }
  @media (max-width: ${device_SM + 'px'}) {
    width: 90vw;
  }
`;

export const Labels = styled.div`
  font-style: normal;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  margin: 0 auto 5.729166666666667vw auto;
`;

export const MainTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 3.2vw;
  margin: 0 auto 2.916666666666667vw auto;
`;

export const SecondaryTitle = styled.div`
  position: relative;
  font-weight: 500;
  font-size: 1.145833333333333vw;
  color: var(--_secondaryTextColor);
  padding: 0 4.427083333333334vw;
  width: auto;
  margin: 0 auto;
  flex-shrink: 0;
  &::before,
  &::after {
    content: '';
    display: block;
    width: 2.604166666666667vw;
    height: 1px;
    position: absolute;
    background: var(--_secondaryTextColor);
    opacity: 0.4;
  }
  &::before {
    top: calc(50% - 1px);
    left: 0;
  }
  &::after {
    top: calc(50% - 1px);
    right: 0;
  }
`;

export const GetStartedWrapper = styled.div`
  margin: 0 auto;
  flex-shrink: 0;
`;

const Button = css`
  border: none;
  border-radius: 6px;
  outline: none;
  padding: 0;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export const GetStartedButton = styled.button`
  ${Button};
  min-width: 240px;
  min-height: 60px;
  width: 15.625vw;
  height: 3.125vw;
  background: linear-gradient(97.14deg, #f8b40a 6.1%, #f0ca23 55.57%);
  box-shadow: 0px 20px 40px rgba(47, 38, 0, 0.1);
  color: #230202;
  font-size: 0.7291666666666667vw;
  @media (max-width: ${device_XXL + 'px'}) {
    font-size: 14px;
  }
`;

export const SignInWrapper = styled.div`
  position: absolute;
  top: 2.604166666666667vw;
  right: 3.125vw;
`;

export const SignInIcon = styled.span`
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 46px;
  height: 46px;
  background: var(--_hoverButtonBg);
  svg {
    width: 35%;
    height: 35%;
    margin: auto;
  }
  @media (min-width: ${device_XXL + 1 + 'px'}) {
    width: 21.49532710280374%;
    height: calc(100% - 10px);
  }
`;

export const SignInText = styled.span`
  display: inline-block;
  max-width: 100%;
  margin: auto;
`;

export const SignInButton = styled.button`
  ${Button};
  display: flex;
  position: relative;
  min-width: 180px;
  min-height: 56px;
  width: 11.14583333333333vw;
  height: 2.916666666666667vw;
  font-weight: bold;
  font-size: 0.625vw;
  letter-spacing: unset;
  background: transparent;
  border: 1px solid;
  color: var(--_primaryWhiteColor);
  border-color: var(--_hoverButtonBg);
  padding: 5px 56px 5px 36px;
  &:hover {
    color: var(--_primaryWhiteColor);
    background: var(--_hoverButtonBg);
    ${SignInIcon} {
      .inheritFill {
        fill: var(--_primaryWhiteColor);
      }
    }
  }
  @media (max-width: ${device_XXL + 'px'}) {
    font-size: 12px;
  }
`;
