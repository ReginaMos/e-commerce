<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Category } from '@commercetools/platform-sdk';
import CategoryElement from '../elements/CategoryElement.vue';
import { getMainCategories } from '../services/categories';

const categories = ref<Category[]>([]);

onMounted(async () => {
  categories.value = await getMainCategories();
});
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <CategoryElement v-for="(category, ind) in categories" :key="ind" :item="category" />
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
