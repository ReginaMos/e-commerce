import { ClientBuilder } from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const projectKey = import.meta.env.CTP_PROJECT_KEY;

const authMiddlewareOptions = {
  host: import.meta.env.CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.CTP_CLIENT_ID,
    clientSecret: import.meta.env.CTP_CLIENT_SECRET,
  },
  scopes: [import.meta.env.CTP_API_SCOPES],
  httpClient: fetch,
};

const httpMiddlewareOptions = {
  host: import.meta.env.CTP_API_URL,
  includeRequestInErrorResponse: true, // Include request in error responses
  includeOriginalRequest: true, // Include request in successful responses
  httpClient: fetch,
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withUserAgentMiddleware()
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
