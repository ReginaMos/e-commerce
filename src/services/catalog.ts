import { apiRoot } from './build-client';
import type {
  ClientResponse,
  Product,
  ProductPagedQueryResponse,
  ProductProjection,
} from '@commercetools/platform-sdk';
import type { ProductInfo } from '../models/models';
// import { getCategoryIdByKey } from './categories';

export async function getProductById(productId: string): Promise<ProductInfo | null> {
  try {
    const { body }: ClientResponse<Product> = await apiRoot.products().withId({ ID: productId }).get().execute();

    const product: ProductInfo = getBriefInfoFromProduct(body);
    return product;
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    return null;
  }
}

export async function getProductsByCategoryKey(categoryKey: string): Promise<ProductProjection[]> {
  try {
    const parentCategoryResponse = await apiRoot
      .categories()
      .get({
        queryArgs: {
          where: `key="${categoryKey}"`,
          limit: 1,
        },
      })
      .execute();

    const parentCategory = parentCategoryResponse.body.results[0];
    if (!parentCategory) {
      console.error(`Категория с ключом ${categoryKey} не найдена.`);
      return [];
    }

    const parentCategoryId = parentCategory.id;
    const childrenResponse = await apiRoot
      .categories()
      .get({
        queryArgs: {
          where: `ancestors(id="${parentCategoryId}")`,
          limit: 500,
        },
      })
      .execute();

    const allCategoryIds = [parentCategoryId, ...childrenResponse.body.results.map((cat) => cat.id)];

    const whereClause = allCategoryIds.map((id) => `categories(id="${id}")`).join(' or ');
    const productsResponse = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: whereClause,
          limit: 50,
          staged: true,
        },
      })
      .execute();

    return productsResponse.body.results;
  } catch (error) {
    console.error('Ошибка при получении товаров по категории:', error);
    return [];
  }
}

async function loadProducts() {
  const products = await getProductsByCategoryKey('accessories-man-wear');
  console.log(products);
}

loadProducts();

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

  const images = masterVariant.images || [];

  const priceData = masterVariant.prices?.[0];
  const price = priceData ? priceData.value.centAmount / 100 : 0;
  const discountedPrice = priceData?.discounted?.value.centAmount ? priceData.discounted.value.centAmount / 100 : 0;
  const currency = priceData?.value.currencyCode || 'USD';
  const description = product.masterData.staged.description?.['en-US'] || '';
  const quantity = product.masterData.staged.masterVariant.availability?.availableQuantity || 0;
  const attributes = product.masterData.staged.masterVariant.attributes || [];
  const size = attributes.find((attr) => attr.name === 'size')?.value;
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
  };
}
