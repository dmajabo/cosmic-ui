import '../fonts/fonts.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';
import { createGlobalStyle } from 'styled-components';

const fontSize = 16;
export const device_XSM = 576;
export const device_SM = 576;
export const device_M = 768;
export const device_L = 1024;
export const device_LL = 1300;
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
  .tagPopup {
    .MuiPopover-paper {
      background: transparent !important;
      box-shadow: 0px 20px 30px rgb(5 20 58 / 10%) !important;
      margin: 12px 0 0 0;
    }
  }
  .textOverflowEllips {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .rndTooltip {
    .resize {
      background: var(--_disabledTextColor);
    }
    .resize-t,
    .resize-b {
      width: 20px !important;
      height: 4px !important;
      left: calc(50% - 10px) !important;
    }
    .resize-t {
      top: -2px !important;
    }
    .resize-b {
      bottom: -2px !important;
    }
    .resize-l,
    .resize-r {
      width: 4px !important;
      height: 20px !important;
      top: calc(50% - 10px) !important;
    }
    .resize-l {
      left: -2px !important;
    }
    .resize-r {
      right: -2px !important;
    }
    .resize-rect {
      width: 15px !important;
      height: 15px !important;
      background: transparent;
      border: 4px solid var(--_disabledTextColor);
    }
    .resize-sw {
      bottom: -2px !important;
      left: -2px !important;
      border-top: none;
      border-right: none;
      border-bottom-left-radius: 6px;
    }
    .resize-se {
      bottom: -2px !important;
      right: -2px !important;
      border-top: none;
      border-left: none;
      border-bottom-right-radius: 6px;
    }
    .resize-nw {
      top: -2px !important;
      left: -2px !important;
      border-bottom: none;
      border-right: none;
      border-top-left-radius: 6px;
    }
    .resize-ne {
      top: -2px !important;
      right: -2px !important;
      border-bottom: none;
      border-left: none;
      border-top-right-radius: 6px;
    }
  }
`;

export default GlobalStyle;
