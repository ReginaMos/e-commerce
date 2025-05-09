<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue';
import FooterComponent from './FooterComponent.vue';
</script>

<template>
  <v-app>
    <p class="advert">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! ShopNow</p>
    <HeaderComponent />
    <main>
      <router-view />
    </main>

    <FooterComponent />
  </v-app>
</template>

<style scoped>
main {
  position: relative;
  padding-top: 142px;
  flex: 1 1 auto;
  height: 100% !important;
  min-height: fit-content;
}
.advert {
  height: 48px;
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
  max-width: 1440px;
}
</style>
