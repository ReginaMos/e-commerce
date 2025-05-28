<script setup lang="ts">
import { aboutAdvantages } from '../constants/aboutPage.ts';
</script>
<template>
  <v-container>
    <v-row>
      <v-col v-for="(advantage, ind) in aboutAdvantages" :key="ind">
        <div>
          <v-img :src="advantage.img" class="aboutAdvantagesImage" />
          <h3>{{ advantage.heading }}</h3>
          <p>{{ advantage.text }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.aboutAdvantagesImage {
  width: 80px;
  height: 80px;
  filter: invert(1);
}
</style>
