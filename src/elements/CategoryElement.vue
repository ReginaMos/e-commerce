<script setup lang="ts">
import type { Category } from '@commercetools/platform-sdk';

const props = defineProps<{ item: Category }>();

const categoryName = Object.values(props.item.name)[0];

function choseIcon(name: string): string {
  switch (name) {
    case 'Man': {
      return 'mdi-tie';
    }
    case 'Woman': {
      return 'mdi-shoe-heel';
    }
    case 'Accessories': {
      return 'mdi-sunglasses';
    }
    case 'Shoes': {
      return 'mdi-shoe-sneaker';
    }
    default: {
      return 'mdi-tshirt-crew';
    }
  }
}
</script>

<template>
  <v-col class="category d-flex flex-wrap align-center" cols="12" sm="5" md="3">
    <v-icon>
      {{ choseIcon(String(item.name['en-US'])) }}
    </v-icon>
    <h3 class="heading">
      {{ categoryName }}
    </h3>
  </v-col>
</template>

<style scoped lang="sass">
.category
  padding: 15px
  border-radius: 12px
  border: 1px solid #cdcdc2
  flex-direction: column
  margin: 10px

.heading
  margin-top: 10px
  font-size: 20px
</style>
