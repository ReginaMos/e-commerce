import type { PromotionModel, TeamModel } from '../models/models';
import home from '../assets/about-page/home.png';
import bag from '../assets/about-page/bag.png';
import dollar from '../assets/about-page/dollar.png';
import pack from '../assets/about-page/pack.png';
import car from '../assets/about-page/car.png';
import phone from '../assets/about-page/phone.png';
import guard from '../assets/about-page/guard.png';
import yura from '../assets/about-page/yura.jpg';
import vika from '../assets/about-page/vika.jpg';
import regina from '../assets/about-page/regina.jpg';
import github from '../assets/about-page/github.svg';
import linked from '../assets/about-page/linked.svg';
import discord from '../assets/about-page/discord.svg';

export const aboutAdvantages: PromotionModel[] = [
  {
    heading: '10.5k',
    text: 'Sallers active our site',
    img: home,
  },
  {
    heading: '33k',
    text: 'Mopnthly Produduct Sale',
    img: dollar,
  },
  {
    heading: '45.5k',
    text: 'Customer active in our site',
    img: pack,
  },
  {
    heading: '25k',
    text: 'Anual gross sale in our site',
    img: bag,
  },
];

export const aboutFeatures: PromotionModel[] = [
  {
    heading: 'FREE AND FAST DELIVERY',
    text: 'Free delivery for all orders over 140 EUR',
    img: car,
  },
  {
    heading: '24/7 CUSTOMER SERVICE',
    text: 'Friendly 24/7 customer support',
    img: phone,
  },
  {
    heading: 'MONEY BACK GUARANTEE',
    text: 'We reurn money within 30 days',
    img: guard,
  },
 
];

export const aboutTeam: TeamModel[] = [
  {
    heading: 'Regina Moiseeva',
    text: 'Team Lead, Frontend Developer',
    img: regina,
    socials: [
      {
        icon: github,
        link: "https://github.com/reginamos", 
      },
      {
        icon: linked,
        link: "https://www.linkedin.com/in/regina-moiseeva-158821284/", 
      },
      {
        icon: discord,
        link: "https://discordapp.com/users/757607699314770054"
      }
    ]
  },
  {
    heading: 'Yuriy Skrypal',
    text: 'Frontend Developer',
    img: yura,
    socials: [
      {
        icon: github,
        link: "https://github.com/sepulator", 
      },
      {
        icon: discord,
        link: "https://discordapp.com/users/973936014009696326", 
      }
    ]
  },
  {
    heading: 'Viktoriia Rosovska',
    text: 'Frontend Developer',
    img: vika,
    socials: [
      {
        icon: github,
        link: "https://github.com/viktoriarosovska", 
      },
      {
        icon: linked,
        link: "www.linkedin.com/in/viktoria-rosovska", 
      },
      {
        icon: discord,
        link: "https://discordapp.com/users/1089664938966011915"
      }

    ]
  },
 
];