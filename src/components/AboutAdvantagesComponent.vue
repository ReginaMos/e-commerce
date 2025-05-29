<script setup lang="ts">
import { aboutAdvantages } from '../constants/aboutPage.ts';
</script>
<template>
  <v-row class="advantage-wrapper">
    <v-col v-for="(advantage, ind) in aboutAdvantages" :key="ind">
      <div class="advantage-item">
        <v-img :src="advantage.img" class="about-advantage-image" />
        <h3>{{ advantage.heading }}</h3>
        <p>{{ advantage.text }}</p>
      </div>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.about-advantage-image {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}
.advantage-wrapper {
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 140px;
  @media screen and (min-width: 1400px) {
    flex-wrap: nowrap;
  }
}
.advantage-wrapper h3 {
  margin-bottom: 8px;
}
.advantage-item:hover .about-advantage-image {
  filter: invert(1);
}
.advantage-item {
  border: 1px solid var(--gray-secondary);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 270px;
  height: 230px;
  font-size: 14px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--red-secondary);
    color: var(--white-text);
    border-color: var(--red-secondary);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
  }
  @media screen and (min-width: 578px) {
    font-size: 16px;
  }
}
.advantage-item .aboutAdvantageImage {
  &:hover,
  &:focus,
  &:active {
    filter: invert(1);
  }
}

.advantage-wrapper :deep(.v-col) {
  width: 270px;
  height: 230px;
  max-width: 270px;
  max-height: 230px;
  justify-content: center;
}
.v-col {
  padding: 0;
}
</style>
