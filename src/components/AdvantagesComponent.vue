<script setup lang="ts">
import { advantages } from '../constants/mainPage';
import AdvantagesElement from '../elements/AdvantagesElement.vue';
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <v-col v-for="(advantage, ind) in advantages" :key="ind" class="mx-4" cols="12" sm="6" md="3">
        <AdvantagesElement :item="advantage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
