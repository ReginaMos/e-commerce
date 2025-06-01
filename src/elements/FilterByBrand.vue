<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { getBrands } from '../services/categories';
import type { FacetTerm } from '@commercetools/platform-sdk';

const brand = ref<string>('Brand');
const brands = ref<FacetTerm[]>([]);
const emit = defineEmits(['chooseBrand']);

function choseBrand(name: string) {
  emit('chooseBrand', name);
  brand.value = name;
}

onMounted(async () => {
  brands.value = await getBrands();
});
</script>

<template>
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ brand }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="choseBrand('ALL')">
          <v-list-item-title> ALL </v-list-item-title>
        </v-list-item>

        <v-list-item v-for="(item, index) in brands" :key="index" :value="index" @click="choseBrand(item.term)">
          <v-list-item-title>{{ item.term }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped></style>
