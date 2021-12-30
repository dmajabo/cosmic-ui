import styled from 'styled-components';
import { device_XXL } from 'styles/global-styles';

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: var(--_primaryTextColor);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 1;
  border-radius: 6px;
  width: 26.04166666666667vw;
  min-width: 300px;
  min-height: 400px;
  height: auto;
  padding: 1.25vw;
  @media (max-width: ${device_XXL + 'px'}) {
    width: 90%;
    max-width: 600px;
  }
`;

export const Submit = styled.button`
  border: none;
  border-radius: 6px;
  outline: none;
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
  min-width: 150px;
  max-width: 400px;
  width: 50%;
  height: 60px;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: unset;
  background: transparent;
  border: 1px solid;
  color: var(--_primaryWhiteColor);
  border-color: var(--_hoverButtonBg);
  padding: 5px 56px;
  margin: 40px 0 20px auto;
`;
