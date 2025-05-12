<script setup lang="ts">
import type { Advantage } from '../models/models';

const props = defineProps<{ item: Advantage }>();
</script>

<template>
  <div class="advantage">
    <v-icon class="icon">
      {{ props.item.icon }}
    </v-icon>
    <h3 class="heading">
      {{ props.item.heading }}
    </h3>
    <p>
      {{ props.item.text }}
    </p>
  </div>
</template>

<style scoped lang="sass">
.icon
    padding: 24px
    border-radius: 50%
    background-color: #cdcdc2
    margin-bottom: 20px

.heading
    text-transform: uppercase
    margin-bottom: 10px
</style>
