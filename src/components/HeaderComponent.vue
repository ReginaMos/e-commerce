<script setup>
import MenuItem from './MenuItem.vue';

const menuList = [
  { title: 'Home', link: '/' },
  { title: 'Contacts', link: '/contacts' },
  { title: 'About', link: '/about' },
  { title: 'Sign Up', link: '/signup' },
];
</script>

<template>
  <header class="header">
    <div class="">
      <p class="">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! ShopNow</p>
    </div>
    <div class="">
      <a href="" class="">Vue Magic Time</a>
      <nav>
        <ul class="">
          <MenuItem v-for="item in menuList" :key="item.title" :title="item.title" :link="item.link" />
        </ul>
      </nav>
      <div class="">
        <input />
        <div class="">
          <button class=""></button>
          <button></button>
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
