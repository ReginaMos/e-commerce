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
  flex: 1 1 auto;
  height: 100% !important;
  min-height: fit-content;
  background-color: var(--background);
  padding-left: var(--padding-horizontal-sm);
  padding-right: var(--padding-horizontal-sm);
  padding-top: 148px;
  padding-bottom: 80px;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 376.98px) {
    padding-left: var(--padding-horizontal-md);
    padding-right: var(--padding-horizontal-md);
  }
  @media screen and (min-width: 1024px) {
    min-width: var(--md);
    max-width: var(--xl);
    padding-left: var(--padding-horizontal-lg);
    padding-right: var(--padding-horizontal-lg);
  }
  @media screen and (min-width: 1200px) {
    padding-top: 202px;
  }
  @media screen and (min-width: 1440px) {
    width: var(--xl);
    padding-left: var(--padding-horizontal-xl);
    padding-right: var(--padding-horizontal-xl);
  }
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
  padding-left: var(--padding-horizontal-sm);
  padding-right: var(--padding-horizontal-sm);
  white-space: nowrap;
  text-overflow: ellipsis !important;
  overflow: hidden !important;

  @media screen and (min-width: 376.98px) {
    padding-left: var(--padding-horizontal-md);
    padding-right: var(--padding-horizontal-md);
  }
  @media screen and (min-width: 1024px) {
    padding-left: var(--padding-horizontal-lg);
    padding-right: var(--padding-horizontal-lg);
  }
  @media screen and (min-width: 1440px) {
    padding-left: var(--padding-horizontal-xl);
    padding-right: var(--padding-horizontal-xl);
  }
}
</style>
