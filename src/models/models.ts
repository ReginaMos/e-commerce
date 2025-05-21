export interface PromotionModel {
  heading: string;
  text: string;
  img: string;
}

export type LinkItem = {
  NAME: string;
  LINK: string;
};

export interface Advantage {
  heading: string;
  text: string;
  icon: string;
}

export interface ProductInfo {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  description: string;
}
