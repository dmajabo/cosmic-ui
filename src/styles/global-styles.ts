import '../fonts/fonts.css';
import { createGlobalStyle } from 'styled-components';

const fontSize = 16;
export const device_XSM = 576;
export const device_SM = 576;
export const device_M = 768;
export const device_L = 1024;
export const device_XL = 1600;
export const device_XXL = 1920;

export const defaultTransition = 'all 0.3s ease-in-out';
const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    margin: 0;
    font-size: ${fontSize + 'px'};
    overflow-x: hidden;
  }

  body {
    font-family: 'DMSans', sans-serif;
  }

  body.fontLoaded {
    font-family: 'DMSans', sans-serif;
  }

  #app {
    background-color: var(--_primaryBg);
    min-height: 100vh;
    width: 100vw;
  }

  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-button {
    background-color: transparent;
    display: none;
  }

  ::-webkit-scrollbar-thumb{
    height: auto;
    background-color: var(--_scrollBarThumb);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-corner{
    background-color: #0a4976;
    background-color: var(--_scrollBarTrack);
  }

  ::-webkit-resizer{
    background-color: var(--_scrollBarThumb);
  }
  p,
  label {
    font-family: 'DMSans', sans-serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
  a {
    text-decoration: none;
  }
  .buttonPopup {
    .MuiPopover-paper {
      background: var(--_primaryBg) !important;
      box-shadow: 0px 20px 30px rgb(5 20 58 / 10%) !important;
    }
  }
  .textOverflowEllips {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
`;

export default GlobalStyle;
