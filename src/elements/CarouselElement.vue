<script setup lang="ts">
    import { promotions } from '../utils/main';
</script>

<template>
    <v-carousel
      height="400"
      show-arrows="hover"
      cycle
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(item, i) in promotions"
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="slide">
                <img :src="item.img" alt="promotion-img">
                <div class="slide__text">
                    <h3>
                        {{ item.heading }}
                    </h3>
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

<style scoped></style>