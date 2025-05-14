import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const projectKey = import.meta.env.VITE_PROJECT_KEY;

const tokenCache: TokenCache = {
  get: () => {
    const token = localStorage.getItem('vmt-anonymous-token');
    return token ? JSON.parse(token) : undefined;
  },
  set: (cache) => {
    localStorage.setItem('vmt-anonymous-token', JSON.stringify(cache));
  },
};

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  },
  scopes: [import.meta.env.VITE_SCOPES],
  httpClient: fetch,
  tokenCache,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL,
  includeRequestInErrorResponse: true, // Include request in error responses
  includeOriginalRequest: true, // Include request in successful responses
  httpClient: fetch,
};

const client = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
