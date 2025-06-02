import { describe, it, expect, vi } from 'vitest';
import { getBrands, getCategories } from '../services/categories';
import { apiRoot } from '../services/build-client';
import type {
  ProductProjectionPagedSearchResponse,
  ByProjectKeyProductProjectionsRequestBuilder,
  ByProjectKeyProductProjectionsSearchRequestBuilder,
  ApiRequest,
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';

vi.mock('@/api/client', () => ({
  apiRoot: {
    productProjections: () => ({
      search: () => ({
        get: () => ({
          execute: vi.fn()
        })
      })
    })
  }
}));

describe('getBrands', () => {
  it('returns facet terms if type is "terms"', async () => {
    const mockExecute = vi.fn().mockResolvedValue({
      body: {
        facets: {
          'variants.attributes.brand': {
            type: 'terms',
            terms: [{ term: 'Nike', count: 10 }, { term: 'Adidas', count: 5 }]
          }
        }
      }
    });

    apiRoot.productProjections = () =>
    ({
      search: () =>
        ({
          get: () =>
            ({
              execute: mockExecute
            } as unknown as ApiRequest<ProductProjectionPagedSearchResponse>)
        } as unknown as ByProjectKeyProductProjectionsSearchRequestBuilder),
      suggest: vi.fn(),
      withId: vi.fn(),
      withKey: vi.fn(),
      args: vi.fn()
    } as unknown as ByProjectKeyProductProjectionsRequestBuilder);

    const brands = await getBrands();
    expect(brands).toEqual([
      { term: 'Nike', count: 10 },
      { term: 'Adidas', count: 5 }
    ]);
  });

  it('returns empty array if type is not "terms"', async () => {
    const mockExecute = vi.fn().mockResolvedValue({
      body: {
        facets: {
          'variants.attributes.brand': {
            type: 'range'
          }
        }
      }
    });

    apiRoot.productProjections = () =>
    ({
      search: () =>
        ({
          get: () =>
            ({
              execute: mockExecute
            } as unknown as ApiRequest<ProductProjectionPagedSearchResponse>)
        } as unknown as ByProjectKeyProductProjectionsSearchRequestBuilder),
      suggest: vi.fn(),
      withId: vi.fn(),
      withKey: vi.fn(),
      args: vi.fn()
    } as unknown as ByProjectKeyProductProjectionsRequestBuilder);

    const brands = await getBrands();
    expect(brands).toEqual([]);
  });

  it('returns empty array on error', async () => {
    const mockExecute = vi.fn().mockRejectedValue(new Error('API error'));

    apiRoot.productProjections = () =>
    ({
      search: () =>
        ({
          get: () =>
            ({
              execute: mockExecute
            } as unknown as ApiRequest<ProductProjectionPagedSearchResponse>)
        } as unknown as ByProjectKeyProductProjectionsSearchRequestBuilder),
      suggest: vi.fn(),
      withId: vi.fn(),
      withKey: vi.fn(),
      args: vi.fn()
    } as unknown as ByProjectKeyProductProjectionsRequestBuilder);

    const brands = await getBrands();
    expect(brands).toEqual([]);
  });
});

describe('getCategories', () => {
  it('returns list of categories on success', async () => {
    const mockCategories: Category[] = [
      { id: '1', name: { en: 'Shoes' } }  as unknown as Category,
      { id: '2', name: { en: 'Clothing' } }  as unknown as Category,
    ];

    const mockExecute = vi.fn().mockResolvedValue({
      body: {
        results: mockCategories
      }
    } as ClientResponse<CategoryPagedQueryResponse>);

    (apiRoot as unknown as {
      categories: () => {
        get: () => ApiRequest<ClientResponse<CategoryPagedQueryResponse>>;
      };
    }).categories = () => ({
      get: () =>
        ({
          execute: mockExecute
        } as unknown as ApiRequest<ClientResponse<CategoryPagedQueryResponse>>)
    });

    const categories = await getCategories();
    expect(categories).toEqual(mockCategories);
  });

  it('returns empty array on error', async () => {
    const mockExecute = vi.fn().mockRejectedValue(new Error('API error'));

    (apiRoot as unknown as {
      categories: () => {
        get: () => ApiRequest<ClientResponse<CategoryPagedQueryResponse>>;
      };
    }).categories = () => ({
      get: () =>
        ({
          execute: mockExecute
        } as unknown as ApiRequest<ClientResponse<CategoryPagedQueryResponse>>)
    });

    const categories = await getCategories();
    expect(categories).toEqual([]);
  });
});