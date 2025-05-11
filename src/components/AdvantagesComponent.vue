<script setup lang="ts">
import { advantages } from '../constants/mainPage';
import AdvantagesElement from '../elements/AdvantagesElement.vue';
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="(advantage, ind) in advantages" :key="ind" class="mx-4">
        <AdvantagesElement :item="advantage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
