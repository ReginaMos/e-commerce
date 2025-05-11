<script setup lang="ts">
import { promotions } from '../constants/mainPage';
</script>

<template>
  <v-carousel height="400" show-arrows="hover" cycle>
    <v-carousel-item v-for="(item, i) in promotions" :key="i">
      <v-sheet height="100%" color="#efefef">
        <div class="d-flex fill-height justify-center align-center">
          <div class="slide">
            <img :src="item.img" alt="promotion-img" />
            <div class="slide__text">
              <h2>
                {{ item.heading }}
              </h2>
              <p>
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped lang="sass">
.slide
  display: flex
  justify-content: space-around
  align-items: center
  width: 100%

  img
    width: 50%

  &__text
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 25px
</style>
