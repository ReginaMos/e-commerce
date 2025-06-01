<script setup lang="ts">
import { aboutFeatures } from '../constants/aboutPage';
</script>
<template>
  <v-row class="features-wrapper">
    <v-col v-for="(feature, ind) in aboutFeatures" :key="ind">
      <div class="feature-item">
        <v-img :src="feature.img" class="about-feature-image" />
        <h3>{{ feature.heading }}</h3>
        <p>{{ feature.text }}</p>
      </div>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.feature-item {
  height: 161px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}
.v-col {
  padding: 0;
}
.feature-item h3 {
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600px;
  white-space: nowrap;
}
.about-feature-image {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}
</style>
