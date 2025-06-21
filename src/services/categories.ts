import { apiRoot } from './build-client';
import type {
  CategoryPagedQueryResponse,
  Category,
  ProductProjectionPagedSearchResponse,
  FacetTerm,
  FacetResult,
} from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/platform-sdk';

export async function getCategories(): Promise<Category[]> {
  try {
    const response: ClientResponse<CategoryPagedQueryResponse> = await apiRoot.categories().get().execute();
    return response.body.results;
  } catch {
    return [];
  }
}

export async function getMainCategories() {
  try {
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: {
          where: 'parent is not defined',
          limit: 100,
        },
      })
      .execute();

    return response.body.results;
  } catch {
    return [];
  }
}

export async function getBrands(): Promise<FacetTerm[]> {
  try {
    const { body }: ClientResponse<ProductProjectionPagedSearchResponse> = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: ['variants.attributes.brand'],
          limit: 0,
        },
      })
      .execute();

    const facetResult: FacetResult | undefined = body.facets?.['variants.attributes.brand'];

    if (facetResult?.type === 'terms') {
      return facetResult.terms;
    }

    return [];
  } catch {
    return [];
  }
}
