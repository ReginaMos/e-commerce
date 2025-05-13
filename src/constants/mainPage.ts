import type { Advantage, PromotionModel } from '../models/models';

export const promotions: PromotionModel[] = [
  {
    heading: 'Spring Style — Up to 50% Off!',
    text: 'Refresh your wardrobe with the latest trends — limited time only!',
    img: 'https://media.istockphoto.com/id/1089326536/photo/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-skirt-caucasian-female.jpg?s=612x612&w=0&k=20&c=xtm7op7zrvyrJsWOKrInglpi9poOobdYgEOizBriyyg=',
  },
  {
    heading: 'Your Dream Jeans at a Dream Price',
    text: 'Find the perfect fit and save big — offer ends soon!',
    img: 'https://img.goodfon.ru/wallpaper/big/a/23/kara-delevin-cara-delevingne-4407.webp',
  },
  {
    heading: 'A Gift with Every Purchase!',
    text: 'Spend over 300$ and get a free fashion accessory.',
    img: 'https://st3.depositphotos.com/9527076/12948/i/950/depositphotos_129487750-stock-photo-top-view-of-beach-summer.jpg',
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
