<script setup lang="ts">
import AdvantagesComponent from '../components/AdvantagesComponent.vue';
import CategoriesComponent from '../components/CategoriesComponent.vue';
import CarouselElement from '../elements/CarouselElement.vue';
import MainHeading from '../elements/MainHeading.vue';
import ProductsComponent from '../components/ProductsComponent.vue';
</script>

<template>
  <v-container fluid>
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

<style scoped lang="sass"></style>
