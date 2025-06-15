import { apiRoot } from './build-client';
import type {
  ClientResponse,
  Product,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  QueryParam,
  LineItem,
} from '@commercetools/platform-sdk';
import type { ProductInfo, Filter, SortBy } from '../models/models';
import { getOrCreateCart } from './cart';
import { ref } from 'vue';

interface QueryArgs {
  [key: string]: QueryParam | undefined;
  filter?: string[];
}

export const totalProducts = ref(0);

export async function getProductById(productId: string): Promise<ProductInfo | null> {
  try {
    const { body }: ClientResponse<Product> = await apiRoot.products().withId({ ID: productId }).get().execute();

    const product: ProductInfo = await getBriefInfoFromProduct(body);
    return product;
  } catch (error) {
    console.error('Error while receiving goods:', error);
    return null;
  }
}

export async function getProducts(
  limit?: number,
  page?: number,
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
    if (typeof page === 'number' && typeof limit === 'number') {
      queryArgs.offset = (page - 1) * limit;
    }

    if (filters.length > 0) queryArgs.filter = filters;
    if (sortArr.length > 0) {
      queryArgs.sort = sortArr;
      if (sort?.price) {
        queryArgs.priceCurrency = 'EUR';
      }
    }

    const response = await apiRoot.productProjections().search().get({ queryArgs }).execute();

    const cart = await getOrCreateCart();
    const lineItems = cart?.lineItems || [];

    totalProducts.value = response.body.total ? response.body.total : 0;
    const products = await Promise.all(
      response.body.results.map((item) => getBriefInfoFromProductProjection(item, lineItems))
    );
    return products;
  } catch (e) {
    console.error('Error while fetching products:', e);
    return [];
  }
}

export async function searchProducts(query: string, page: number): Promise<ProductInfo[]> {
  try {
    const { body }: ClientResponse<ProductProjectionPagedSearchResponse> = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en-US': query,
          limit: 6,
          offset: (page - 1) * 6,
        },
      })
      .execute();

    const cart = await getOrCreateCart();
    const lineItems = cart?.lineItems || [];
    totalProducts.value = body.total ? body.total : 0;
    console.log('search', totalProducts);

    const products = await Promise.all(body.results.map((item) => getBriefInfoFromProductProjection(item, lineItems)));
    return products;
  } catch (error) {
    console.error('Error while receiving goods:', error);
    return [];
  }
}

async function getBriefInfoFromProductProjection(
  product: ProductProjection,
  lineItems: LineItem[]
): Promise<ProductInfo> {
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

  const cartQuantity = lineItems.find((item) => item.productId === product.id)?.quantity;

  const inCartQuantity = cartQuantity ? cartQuantity : 0;

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
    inCartQuantity,
  };
}

async function getBriefInfoFromProduct(product: Product): Promise<ProductInfo> {
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

  const cart = await getOrCreateCart();
  const lineItems = cart?.lineItems || [];
  const cartQuantity = lineItems.find((item) => item.productId === product.id)?.quantity;

  const inCartQuantity = cartQuantity ? cartQuantity : 0;

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
    inCartQuantity,
  };
}
