import { apiRoot } from './build-client';
import type { CategoryPagedQueryResponse, Category } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/platform-sdk';

export async function getCategories(): Promise<Category[]> {
  try {
    const response: ClientResponse<CategoryPagedQueryResponse> = await apiRoot.categories().get().execute();
    /* TO DO: save categories in store ? */
    return response.body.results;
  } catch (error) {
    console.error('Error while getting categories', error);
    return [];
  }
}
