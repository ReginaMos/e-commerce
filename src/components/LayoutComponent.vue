<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue';
import FooterComponent from './FooterComponent.vue';
</script>

<template>
  <v-app>
    <div class="advert">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! ShopNow</div>
    <HeaderComponent />
    <main>
      <router-view />
    </main>

    <FooterComponent />
  </v-app>
</template>

<style scoped lang="scss">
main {
  position: relative;
  padding-top: 142px;
  flex: 1 1 auto;
  height: 100% !important;
  min-height: fit-content;
  background-color: var(--background);
}
.advert {
  height: 48px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: var(--white-text);
  background-color: var(--black-background);
  position: fixed;
  width: 100%;
  z-index: 1000;
  min-width: 320px;
  max-width: 1440px;
  padding-left: 20px;
  padding-right: 20px;
  white-space: nowrap;
  text-overflow: ellipsis !important;
  overflow: hidden !important;

  @media screen and (min-width: 376.98px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media screen and (min-width: 1024px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @media screen and (min-width: 1440px) {
    padding-left: 135px;
    padding-right: 135px;
  }
}
</style>
