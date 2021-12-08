export const APP_GENERAL_CONST = {
  support: 'support@okulis.ai',
  feedback: 'info@okulis.ai',
};

export const DEBOUNCE_TIME = 300;
export const APP_HEADER_HEIGHT = '80px';
export const DEFAULT_TRANSITION = '0.3s linear';
export interface IKEYBOARD_KEY {
  key: string;
  keyCode: number;
}

export interface IKEYBOARD_KEYS {
  ENTER: IKEYBOARD_KEY;
}

export const KEYBOARD_KEYS: IKEYBOARD_KEYS = {
  ENTER: {
    key: 'Enter',
    keyCode: 13,
  },
};
