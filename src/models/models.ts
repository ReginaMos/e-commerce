export interface PromotionModel {
  heading: string;
  text: string;
  img: string;
}

interface Social {
  icon: string;
  link: string;
}
export interface TeamModel {
  heading: string;
  text: string;
  img: string;
  socials: Array<Social>;
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

export interface Filter {
  category: string;
  size: string;
  brand: string;
}

export type MessageType = 'billing' | 'shipping' | 'saved' | 'other';
export type AddressMessages = Record<MessageType, { text: string; icon: string }>;
