import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type Client,
  type Credentials,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type UserAuthOptions,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { clearToken, tokenCache } from './token-cache';

const projectKey = import.meta.env.VITE_PROJECT_KEY;

const refreshToken = tokenCache.get()?.refreshToken;

let client: Client;

const credentials: Credentials = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
};

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey,
  credentials,
  scopes: [import.meta.env.VITE_SCOPES],
  httpClient: fetch,
  tokenCache,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL,
  includeRequestInErrorResponse: true,
  includeOriginalRequest: true,
  httpClient: fetch,
};

const buildAnonymousClient = () =>
  new ClientBuilder().withAnonymousSessionFlow(authMiddlewareOptions).withHttpMiddleware(httpMiddlewareOptions).build();

function buildClientWithRefreshToken() {
  if (refreshToken) {
    return new ClientBuilder()
      .withRefreshTokenFlow({
        ...authMiddlewareOptions,
        refreshToken,
      })
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  } else {
    return buildAnonymousClient();
  }
}
client = buildClientWithRefreshToken();

export function buildCustomerClient(user: UserAuthOptions) {
  clearToken();

  const customerAuthOptions: PasswordAuthMiddlewareOptions = {
    ...authMiddlewareOptions,
    credentials: {
      ...credentials,
      user,
    },
  };

  client = new ClientBuilder().withPasswordFlow(customerAuthOptions).withHttpMiddleware(httpMiddlewareOptions).build();
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export function resetClient() {
  clearToken();
  client = buildAnonymousClient();
}

export const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
