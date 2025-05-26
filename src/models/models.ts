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
export interface Images {
  dimensions: {
    w: number;
    h: number;
  };
  url: string;
}

export interface Attributes {
  name: string;
  value: string;
}
export interface ProductInfo {
  id: string;
  name: string;
  images: Images[];
  price: number;
  discountedPrice?: number;
  currency: string;
  description: string;
  quantity: number;
  attributes: Attributes[];
  size: string;
  brand: string;
}
