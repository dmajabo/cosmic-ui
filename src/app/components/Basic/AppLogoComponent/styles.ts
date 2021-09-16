import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin: 0 auto;
  align-items: center;
  color: var(--_primaryTextColor);
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Logo = styled.div`
  min-width: 32px;
  min-height: 32px;
  width: 72vw;
  height: 72vw;
  flex-shrink: 0;
  margin-right: 20vw;
`;

export const LogoLabel = styled.div`
  font-weight: 700;
  font-size: 48px;
  margin: auto 0;
  line-height: normal;
  padding-top: 5px;
`;
