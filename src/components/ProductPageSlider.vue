<script setup lang="ts">
import { ref } from 'vue';
import type { ProductInfo } from '../models/models.ts';

defineProps<{
  product?: ProductInfo;
}>();

const currentSlide = ref(0);
function onCarouselClick(event: MouseEvent | TouchEvent) {
  const target = event.target as HTMLElement;
  if (target.classList.contains('v-btn') || target.closest('.v-btn')) {
    event.stopPropagation();
  }
}
</script>
<template>
  <v-carousel
    v-if="product?.images?.length"
    v-model="currentSlide"
    class="carousel-slider-small"
    height="null"
    @click="onCarouselClick"
  >
    <v-carousel-item
      height="auto"
      v-for="(image, index) in product?.images"
      :key="image.url"
      :value="image.url"
      :items-to-show="1"
    >
      <v-img :src="image.url" :alt="product?.name" class="page-slider-image" contain></v-img>
      <span class="current-slide-index">{{ index + 1 }}/{{ product?.images.length }}</span>
    </v-carousel-item>
  </v-carousel>
</template>
<style scoped lang="scss">
.carousel-slider-small.v-carousel {
  height: auto !important;
}
.current-slide-index {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
.carousel-slider-small :deep(.v-carousel__controls) {
  display: none;
}
.carousel-slider-small :deep(.v-btn) {
  background-color: transparent;
  &:hover,
  &:focus,
  &:active {
    background: var(--white-background);
  }
}

.carousel-slider-small :deep(.v-btn--variant-elevated) {
  box-shadow: none;
}
</style>
