import { throwAndDisplayWithMessage } from './utils';

interface TokenInfo {
  token: string;
  personId: string;
}
export interface ITokenStore {
  setToken: (tokenInfo: TokenInfo) => void;
  clear: () => void;
  getToken: () => string;
}

export class TokenStore implements ITokenStore {
  private key: string;

  constructor(key: string) {
    if (!key) {
      throwAndDisplayWithMessage(key);
    }
    this.key = key;
  }
  public clear = () => {
    localStorage.removeItem(this.key);
  };
  public setToken = (tokenInfo: TokenInfo) => {
    if (!tokenInfo) {
      throwAndDisplayWithMessage('tokenInfo');
    }
    localStorage.setItem(this.key, JSON.stringify(tokenInfo));
  };
  public getToken = () => {
    const user = JSON.parse(localStorage.getItem(this.key) as any);

    if (user) {
      return user.token;
    } else {
      return null;
    }
  };
}
