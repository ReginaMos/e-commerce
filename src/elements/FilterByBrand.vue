<script setup lang="ts">
import { ref, onMounted } from 'vue';

// const brands = ref([]);
const myBrands = ['Nike', 'Adidas', 'Elements'];
const brand = ref<string>('Brand');

function choseBrand(name: string) {
  brand.value = name;
}

onMounted(async () => {
  //await getBrands();
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
        <v-list-item v-for="(item, index) in myBrands" :key="index" :value="index" @click="choseBrand(item)">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped></style>
