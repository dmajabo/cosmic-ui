export const APP_GENERAL_CONST = {
  support: 'support@okulis.ai',
  feedback: 'info@okulis.ai',
};

export const DEBOUNCE_TIME = 300;
export const APP_HEADER_HEIGHT = '81px';
export const DEFAULT_TRANSITION = '0.3s linear';
export interface IKEYBOARD_KEY {
  key: string;
  keyCode: number;
}

export interface IKEYBOARD_KEYS {
  ENTER: IKEYBOARD_KEY;
  ARROW_UP: IKEYBOARD_KEY;
  ARROW_DOWN: IKEYBOARD_KEY;
  TAB: IKEYBOARD_KEY;
}

export const KEYBOARD_KEYS: IKEYBOARD_KEYS = {
  ENTER: {
    key: 'Enter',
    keyCode: 13,
  },
  ARROW_UP: {
    key: 'ArrowUp',
    keyCode: 38,
  },
  ARROW_DOWN: {
    key: 'ArrowDown',
    keyCode: 40,
  },
  TAB: {
    key: 'Tab',
    keyCode: 9,
  },
};
