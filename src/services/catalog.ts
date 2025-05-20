import { apiRoot } from './build-client';
import type { ClientResponse, Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import type { ProductInfo } from '../models/models';


export async function getProductById(productId: string): Promise<ProductInfo | null> {
  try {
    const { body }: ClientResponse<Product> = await apiRoot
      .products()
      .withId({ID: productId })
      .get()
      .execute();

    const product: ProductInfo = getBriefInfoFromProduct(body);
    return product;
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    return null;
  }
}


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
  const description = product.masterData.staged.description?.["en-US"] || '';

  return {
    id: product.id,
    name,
    imageUrl,
    price,
    discountedPrice,
    currency,
    description
  };
}
