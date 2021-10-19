import styled from 'styled-components';
import { Logo, LogoWrapper, LogoLabel } from 'app/components/Basic/AppLogoComponent/styles';

export const PageLayout = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: var(--_primaryBg);
`;

export const RightBlock = styled.div`
  display: flex;
  overflow: hidden;
  position: fixed;
  width: 30.52083333333333vw;
  height: 100vh;
  background: var(--_primaryColor);
  flex-shrink: 0;
  padding: 1.041666666666667vw;
  ${LogoWrapper} {
    position: absolute;
    top: 2.604166666666667vw;
    left: 2.604166666666667vw;
    z-index: 2;
  }
  ${Logo} {
    width: 2.395833333333333vw;
    height: 2.395833333333333vw;
    margin-right: 0.7291666666666667vw;
  }
  ${LogoLabel} {
    font-size: 1.197916666666667vw;
  }
`;

export const LeftBlock = styled.div`
  display: flex;
  overflow: hidden;
  width: calc(100vw - 30.52083333333333vw);
  margin-left: 30.52083333333333vw;
  height: 100%;
  flex-shrink: 0;
`;

export const ArticleContent = styled.div`
  display: flex;
  margin: auto;
  max-width: 80%;
  z-index: 1;
`;
