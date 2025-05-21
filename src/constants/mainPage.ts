import type { Advantage, PromotionModel } from '../models/models';
import promotionFirstImg from '../assets/main-page/promotion-1.jpg';
import promotionSecondImg from '../assets/main-page/promotion-2.webp';
import promotionThirdImg from '../assets/main-page/promotion-3.jpg';

export const promotions: PromotionModel[] = [
  {
    heading: 'Spring Style — Up to 50% Off!',
    text: 'Refresh your wardrobe with the latest trends — limited time only!',
    img: promotionFirstImg,
  },
  {
    heading: 'Your Dream Jeans at a Dream Price',
    text: 'Find the perfect fit and save big — offer ends soon!',
    img: promotionSecondImg,
  },
  {
    heading: 'A Gift with Every Purchase!',
    text: 'Spend over 300$ and get a free fashion accessory.',
    img: promotionThirdImg,
  },
];

export const advantages: Advantage[] = [
  {
    heading: 'Cool Styles, All Year Round',
    text: 'We’ve got fresh looks for every season and every vibe.',
    icon: 'mdi-weather-partly-cloudy',
  },
  {
    heading: 'Quality You Can Count On',
    text: 'Comfy, durable clothes that feel as good as they look.',
    icon: 'mdi-alert-circle-check',
  },
  {
    heading: 'No Drama Shopping',
    text: 'Easy orders, fast shipping, and simple returns.',
    icon: 'mdi-truck-delivery',
  },
];
