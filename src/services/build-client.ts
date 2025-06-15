import { createApiBuilderFromCtpClient, ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { ClientBuilder, type Client } from '@commercetools/ts-client';
import { tokenCache } from './token-cache';

let apiRoot: ByProjectKeyRequestBuilder;
let currentClient: Client;

const createConfig = () => ({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  },
  authOptions: {
    host: import.meta.env.VITE_AUTH_URL,
    scopes: [import.meta.env.VITE_SCOPES],
    httpClient: fetch,
    tokenCache,
  },
  httpOptions: {
    host: import.meta.env.VITE_API_URL,
    includeRequestInErrorResponse: true,
    includeOriginalRequest: true,
    httpClient: fetch,
  },
});

export function createAnonymousClient() {
  const config = createConfig();

  return new ClientBuilder()
    .withAnonymousSessionFlow({
      ...config.authOptions,
      projectKey: config.projectKey,
      credentials: config.credentials,
    })
    .withHttpMiddleware(config.httpOptions)
    .build();
}

export function createRefreshTokenClient(refreshToken: string, expirationTime: number) {
  const config = createConfig();

  if (Date.now() > expirationTime) {
    return createAnonymousClient();
  }

  return new ClientBuilder()
    .withRefreshTokenFlow({
      ...config.authOptions,
      projectKey: config.projectKey,
      credentials: config.credentials,
      refreshToken,
    })
    .withHttpMiddleware(config.httpOptions)
    .build();
}

export function createCustomerClient(username: string, password: string) {
  const config = createConfig();

  currentClient = new ClientBuilder()
    .withPasswordFlow({
      ...config.authOptions,
      projectKey: config.projectKey,
      credentials: {
        ...config.credentials,
        user: { username, password },
      },
    })
    .withHttpMiddleware(config.httpOptions)
    .build();

  apiRoot = createApiRoot(currentClient);
}

export function createApiRoot(client: Client) {
  const config = createConfig();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: config.projectKey });
}

export function initializeApiRoot() {
  const token = tokenCache.get();

  if (token?.refreshToken && token?.expirationTime) {
    currentClient = createRefreshTokenClient(token.refreshToken, token.expirationTime);
  } else {
    currentClient = createAnonymousClient();
  }

  apiRoot = createApiRoot(currentClient);
  return apiRoot;
}

export function resetClient() {
  currentClient = createAnonymousClient();
  apiRoot = createApiRoot(currentClient);
}

export { apiRoot };
