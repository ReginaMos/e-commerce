import { apiRoot } from './build-client';
import type { ClientResponse, Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import type { ProductInfo } from '../models/models';

export async function getProducts(limit?: number): Promise<ProductInfo[]> {
  try {
    const { body }: ClientResponse<ProductPagedQueryResponse> = await apiRoot
      .products()
      .get({
        queryArgs: {
          limit: limit,
        },
      })
      .execute();

    const products: ProductInfo[] = body.results.map((item) => getBriefInfoFromProduct(item));
    return products;
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    return [];
  }
}

function getBriefInfoFromProduct(product: Product): ProductInfo {
  const current = product.masterData.staged;
  const masterVariant = current.masterVariant;
  const name = Object.values(current.name)[0];

  const imageUrl = masterVariant.images?.[0]?.url || '';

  const priceData = masterVariant.prices?.[0];
  const price = priceData ? priceData.value.centAmount / 100 : 0;
  const discountedPrice = priceData?.discounted?.value.centAmount ? priceData.discounted.value.centAmount / 100 : 0;
  const currency = priceData?.value.currencyCode || 'USD';

  return {
    id: product.id,
    name,
    imageUrl,
    price,
    discountedPrice,
    currency,
  };
}
