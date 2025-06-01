import { apiRoot } from './build-client';
import type {
  ClientResponse,
  Product,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import type { ProductInfo, Filter } from '../models/models';

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

export async function getFilteredProducts(limit?: number, filter?: Filter): Promise<ProductInfo[]> {
  try {
    const categoryKey = filter?.category?.trim();
    const brandName = filter?.brand?.trim();

    let categoryIds: string[] = [];

    if (categoryKey) {
      const parentCategoryResponse = await apiRoot.categories().get({
        queryArgs: {
          where: `key="${categoryKey}"`,
          limit: 1,
        },
      }).execute();

      const parentCategory = parentCategoryResponse.body.results[0];
      if (!parentCategory) {
        console.error(`Category with key ${categoryKey} not found.`);
        return [];
      }

      const parentCategoryId = parentCategory.id;

      const childrenResponse = await apiRoot.categories().get({
        queryArgs: {
          where: `ancestors(id="${parentCategoryId}")`,
          limit: 20,
        },
      }).execute();

      categoryIds = [parentCategoryId, ...childrenResponse.body.results.map(cat => cat.id)];
    }

    const whereClauses: string[] = [];

    if (categoryIds.length > 0) {
      const categoryClause = categoryIds.map(id => `categories(id="${id}")`).join(" or ");
      whereClauses.push(`(${categoryClause})`);
    }

    if (brandName) {
      const brandClause = `masterVariant(attributes(name="brand" and value="${brandName}")) or  variants(attributes(name="brand" and value="${brandName}"))`;
      whereClauses.push(`(${brandClause})`);
    }

    const where = whereClauses.length > 0 ? whereClauses.join(" and ") : undefined;

    const response = await apiRoot.productProjections().get({
      queryArgs: {
        limit: limit,
        where,
        staged: true,
      },
    }).execute();

    const products: ProductInfo[] = response.body.results.map(item => getBriefInfoFromProductProjection(item));
    return products;

  } catch (error) {
    console.error("Error while fetching filtered products:", error);
    return [];
  }
}

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
