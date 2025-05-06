<script setup>
import MenuItem from './MenuItem.vue';
import { Heart, ShoppingCart } from 'lucide-vue-next';

const menuList = [
  { title: 'Home', link: '/' },
  { title: 'Contacts', link: '/contacts' },
  { title: 'About', link: '/about' },
  { title: 'Sign Up', link: '/signup' },
];
</script>

<template>
  <header class="header">
    <div class="h-[48px] flex items-center justify-center bg-[black]">
      <p class="text-[white]">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! ShopNow</p>
    </div>
    <div class="container px-[135px] flex items-center bg-blue-500 pt-[40px] pb-[16px]">
      <a href="" class="mr-auto text-[24px] font-extrabold">Vue Magic Time</a>
      <nav>
        <ul class="gap-[48px] flex items-center mr-[148px]">
          <MenuItem v-for="item in menuList" :key="item.title" :title="item.title" :link="item.link" />
          <!-- <li><a href="#" class="">Contact</a></li>
        <li><a href="#" class="">About</a></li>
        <li><a href="#" class="">Sign Up</a></li> -->
        </ul>
      </nav>
      <div class="flex gap-[24px]">
        <input />
        <div class="flex gap-[16px]">
          <button class="bg-indigo-500 size-[32px] flex items-center justify-center"><Heart :size="32" /></button>
          <button><ShoppingCart :size="32" /></button>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.header {
  position: sticky;
  top: 0;
}
.active {
  text-decoration: underline;
}
</style>
