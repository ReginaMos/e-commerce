import type { TokenCache } from '@commercetools/ts-client/dist/declarations/src/types/types';
import { TOKEN_KEY } from '../constants/local-storage';

export const tokenCache: TokenCache = {
  get: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? JSON.parse(token) : undefined;
  },
  set: (cache) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(cache));
  },
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
