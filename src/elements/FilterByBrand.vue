<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getBrands } from '../services/categories';

const brand = ref<string>('Brand');
const brands = ref([]);

function choseBrand(name: string) {
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
        <v-list-item v-for="(item, index) in brands" :key="index" :value="index" @click="choseBrand(item.term)">
          <v-list-item-title>{{ item.term }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped></style>
