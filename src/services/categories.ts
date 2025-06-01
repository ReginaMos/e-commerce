import { apiRoot } from './build-client';
import type { CategoryPagedQueryResponse, Category,ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/platform-sdk';

export async function getCategories(): Promise<Category[]> {
  try {
    const response: ClientResponse<CategoryPagedQueryResponse> = await apiRoot.categories().get().execute();
    return response.body.results;
  } catch (error) {
    console.error('Error while getting categories', error);
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
  } catch (error) {
    console.error('Ошибка при получении главных категорий:', error);
    return [];
  }
}

export async function getBrands() {
   try {
    const { body }: ClientResponse<ProductProjectionPagedSearchResponse> = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: [
            'variants.attributes.brand'
          ],
          limit: 0,
        },
      })
      .execute();
    
    return body.facets?.["variants.attributes.brand"].terms;
  } catch (error) {
    console.error('Error while receiving goods:', error);
    return [];
  }
}

// export async function getCategoryIdByKey(categoryKey: string): Promise<string | null> {
//   try {
//     const response = await apiRoot
//       .categories()
//       .withKey({ key: categoryKey })
//       .get()
//       .execute();

//     return response.body.id;
//   } catch (error) {
//     console.error('Ошибка при получении категории по ключу:', error);
//     return null;
//   }
// }
