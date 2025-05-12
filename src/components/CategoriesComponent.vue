<script setup lang="ts">
import type { Category } from '@commercetools/platform-sdk';
import CategoryElement from '../elements/CategoryElement.vue';
import { getCategories } from '../services/categories';

const categories: Category[] = await getCategories();
</script>

<template>
  <v-container>
    <v-row>
        <CategoryElement v-for="(category, ind) in categories" :key="ind" class="mx-4" :item="category" />
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
