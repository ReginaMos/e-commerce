import { ClientBuilder, type PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';

const projectKey = import.meta.env.VITE_PROJECT_KEY;

const options: PasswordAuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    user: {
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD,
    },
  },
  scopes: [`manage_project:${projectKey}`],
};

export const client = new ClientBuilder().withPasswordFlow(options).build();
