<script setup lang="ts">
import type { Category } from '@commercetools/platform-sdk';

defineProps<{ item: Category }>();

function choseIcon(name: string): string {
    switch(name) {
        case 'men': {
            return 'mdi-tie'
        }
        case 'women': {
            return 'mdi-shoe-heel'
        }
        case 'accessories': {
            return 'mdi-sunglasses';
        }
        case 'shoes': {
            return 'mdi-shoe-sneaker';
        }
        default: {
            return 'mdi-tshirt-crew';
        }
    }
}
</script>

<template>
  <v-col class="category">
    <v-icon>
      {{ choseIcon(String(item.name)) }}
    </v-icon>
    <h3 class="heading">
      {{ item.name }}
    </h3>
  </v-col>
</template>

<style scoped lang="sass">
.category
    padding: 15px
    border-radius: 12px
    border: 1px solid #cdcdc2

.heading
    margin-top: 10px
    font-size: 15px
</style>