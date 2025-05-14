<script setup lang="ts">
import AdvantagesComponent from '../components/AdvantagesComponent.vue';
import CategoriesComponent from '../components/CategoriesComponent.vue';
import CarouselElement from '../elements/CarouselElement.vue';
import MainHeading from '../elements/MainHeading.vue';
import ProductsComponent from '../components/ProductsComponent.vue';
</script>

<template>
  <v-container class="main-page">
    <v-row class="mb-4">
      <CarouselElement />
    </v-row>

    <v-row class="mb-4">
      <MainHeading title="Why us?" />
      <AdvantagesComponent />
    </v-row>

    <v-row class="mb-4">
      <MainHeading title="Categories" />
      <CategoriesComponent />
    </v-row>

    <v-row class="mb-4">
      <MainHeading title="Our products" />
      <ProductsComponent count="4" />
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">
.main-page
  padding-left: 20px
  padding-right: 20px
  min-width: 320px
  max-width: 376px
  @media screen and (min-width: 376.98px)
    padding-left: 40px
    padding-right: 40px
    min-width: 376px
    max-width: 1024px
  @media screen and (min-width: 1024px)
    min-width: 1024px
    max-width:1440px
    padding-left: 80px
    padding-right: 80px
  @media screen and (min-width: 1440px)
    width: 1440px
    padding-left: 135px
    padding-right: 135px
</style>
