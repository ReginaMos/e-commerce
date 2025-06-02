import { apiRoot } from './build-client';
import type {
  ClientResponse,
  Product,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  QueryParam,
} from '@commercetools/platform-sdk';
import type { ProductInfo, Filter, SortBy } from '../models/models';

interface QueryArgs {
  [key: string]: QueryParam | undefined;
  filter?: string[];
}

export async function getProductById(productId: string): Promise<ProductInfo | null> {
  try {
    const { body }: ClientResponse<Product> = await apiRoot.products().withId({ ID: productId }).get().execute();

    const product: ProductInfo = getBriefInfoFromProduct(body);
    return product;
  } catch (error) {
    console.error('Error while receiving goods:', error);
    return null;
  }
}

export async function getProducts(
  limit?: number,
  filter?: Filter,
  sort?: SortBy
): Promise<ProductInfo[]> {
  try {
    const locale = 'en-US';

    let parentCategoryId: string | undefined;

    if (filter?.category) {
      const categoryKey = filter.category.trim();
      const catResp = await apiRoot
        .categories()
        .get({
          queryArgs: {
            where: `key="${categoryKey}"`,
            limit: 1,
          },
        })
        .execute();

      const parent = catResp.body.results[0];
      if (!parent) {
        console.error(`Category with key "${categoryKey}" not found.`);
        return [];
      }
      parentCategoryId = parent.id;
    }

    const filters: string[] = [];

    if (parentCategoryId) {
      filters.push(`categories.id:subtree("${parentCategoryId}")`);
    }

    if (filter?.brand?.trim()) {
      const brandName = filter.brand.trim();
      filters.push(`variants.attributes.brand:"${brandName}"`);
    }

    const sortArr: string[] = [];
    if (sort?.price) {
      sortArr.push(`price ${sort.price}`);
    }
    if (sort?.name) {
      sortArr.push(`name.${locale} ${sort.name}`);
    }

    const queryArgs: QueryArgs = { staged: true };

    if (typeof limit === 'number') queryArgs.limit = limit;
    if (filters.length > 0) queryArgs.filter = filters;
    if (sortArr.length > 0) {
      queryArgs.sort = sortArr;
      if (sort?.price) {
        queryArgs.priceCurrency = 'EUR';
      }
    }

    const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();
    return response.body.results.map((item) => getBriefInfoFromProductProjection(item));
  } catch (e) {
    console.error('Error while fetching products:', e);
    return [];
  }
}

// export async function getProducts(limit?: number, filter?: Filter, sort?: SortBy): Promise<ProductInfo[]> {
//   try {
//     const categoryKey = filter?.category?.trim();
//     const brandName = filter?.brand?.trim();

//     let categoryIds: string[] = [];

//     if (categoryKey) {
//       const parentCategoryResponse = await apiRoot
//         .categories()
//         .get({
//           queryArgs: {
//             where: `key="${categoryKey}"`,
//             limit: 1,
//           },
//         })
//         .execute();

//       const parentCategory = parentCategoryResponse.body.results[0];
//       if (!parentCategory) {
//         console.error(`Category with key ${categoryKey} not found.`);
//         return [];
//       }

//       const parentCategoryId = parentCategory.id;

//       const childrenResponse = await apiRoot
//         .categories()
//         .get({
//           queryArgs: {
//             where: `ancestors(id="${parentCategoryId}")`,
//             limit: 20,
//           },
//         })
//         .execute();

//       categoryIds = [parentCategoryId, ...childrenResponse.body.results.map((cat) => cat.id)];
//     }
//     const sortParams: string[] = [];

//     if (sort?.name) {
//       sortParams.push(sort.name);
//     }

//     if (sort?.price) {
//       sortParams.push(sort.price);
//     }

//     const queryArgs: QueryArgs = {
//         limit,
//         staged: true,
//         sort: sortParams.length > 0 ? sortParams : undefined,
//         priceCurrency: sort?.price?.includes('scopedPrice') ? 'EUR' : undefined,
//         filter: [],
//     };

//     if (categoryIds.length > 0) {
//       const categoryFilter = `categories.id:(${categoryIds.map(id => `"${id}"`).join(',')})`;
//       queryArgs.filter!.push(categoryFilter);
//     }

//     if (brandName) {
//       const brandFilter = `variants.attributes.brand:"${brandName}"`;
//       queryArgs.filter!.push(brandFilter);
//     }

//     if (sortParams.length > 0) {
//       queryArgs.sort = sortParams;
//     }

//     if (sort?.price?.includes('scopedPrice')) {
//       queryArgs.priceCurrency = 'EUR';
//     }

//     const response = await apiRoot
//     .productProjections()
//     .search()
//     .get({ queryArgs })
//     .execute();

//     const products: ProductInfo[] = response.body.results.map((item) => getBriefInfoFromProductProjection(item));
//     return products;
//   } catch (error) {
//     console.error('Error while fetching filtered products:', error);
//     return [];
//   }
// }

export async function searchProducts(query: string): Promise<ProductInfo[]> {
  try {
    const { body }: ClientResponse<ProductProjectionPagedSearchResponse> = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en-US': query,
          limit: 20,
        },
      })
      .execute();
    const products: ProductInfo[] = body.results.map((item) => getBriefInfoFromProductProjection(item));
    return products;
  } catch (error) {
    console.error('Error while receiving goods:', error);
    return [];
  }
}

function getBriefInfoFromProductProjection(product: ProductProjection): ProductInfo {
  const masterVariant = product.masterVariant;
  const name = product.name?.['en-US'];

  const images = masterVariant.images || [];

  const priceData = masterVariant.prices?.[0];
  const price = priceData ? priceData.value.centAmount / 100 : 0;
  const discountedPrice = priceData?.discounted?.value.centAmount ? priceData.discounted.value.centAmount / 100 : 0;
  const currency = priceData?.value.currencyCode || 'USD';
  const description = product.description?.['en-US'] || '';
  const quantity = masterVariant.availability?.availableQuantity || 0;
  const attributes = masterVariant.attributes || [];
  const size = attributes.find((attr) => attr.name === 'size')?.value;
  const brand = attributes.find((attr) => attr.name === 'brand')?.value;
  return {
    id: product.id,
    name,
    images,
    price,
    discountedPrice,
    currency,
    description,
    quantity,
    attributes,
    size,
    brand,
  };
}

function getBriefInfoFromProduct(product: Product): ProductInfo {
  const current = product.masterData.staged;
  const masterVariant = current.masterVariant;
  const name = Object.values(current.name)[0];

  const images = masterVariant.images || [];

  const priceData = masterVariant.prices?.[0];
  const price = priceData ? priceData.value.centAmount / 100 : 0;
  const discountedPrice = priceData?.discounted?.value.centAmount ? priceData.discounted.value.centAmount / 100 : 0;
  const currency = priceData?.value.currencyCode || 'USD';
  const description = product.masterData.staged.description?.['en-US'] || '';
  const quantity = product.masterData.staged.masterVariant.availability?.availableQuantity || 0;
  const attributes = product.masterData.staged.masterVariant.attributes || [];
  const size = attributes.find((attr) => attr.name === 'size')?.value;
  const brand = attributes.find((attr) => attr.name === 'brand')?.value;
  return {
    id: product.id,
    name,
    images,
    price,
    discountedPrice,
    currency,
    description,
    quantity,
    attributes,
    size,
    brand,
  };
}
