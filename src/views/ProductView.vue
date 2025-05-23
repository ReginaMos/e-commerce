<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getProductById } from '../services/catalog';
import { onMounted, ref, computed } from 'vue';
import type { ProductInfo, Attributes } from '../models/models';

const route = useRoute();
const id = route.params.id;
const product = ref<ProductInfo | null>(null);

onMounted(async () => {
  if (typeof id === 'string') {
    product.value = await getProductById(id);
    console.log(product.value);
  } else {
    console.error('invalid param Id:', id);
  }
});

const name = computed(() => product.value?.name || '');
const dialog = ref(false);
const selectedImage = computed(() => product.value?.images?.[0]?.url || '');
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-dialog class="dialog-slider" v-model="dialog">
          <template v-slot:activator="{ props }">
            <v-img :src="selectedImage || product?.images[0]?.url" :alt="product?.name" v-bind="props"></v-img>
          </template>
          <v-card class="card-dialog">
            <v-card-title class="text-h5 grey lighten-2">
              {{ product?.name }}
            </v-card-title>
            <v-carousel class="carousel-slider">
              <v-carousel-item
                v-for="(image, index) in product?.images"
                :key="image.url"
                :value="image.url"
                :items-to-show="1"
              >
                <v-sheet>
                  <v-card>
                    <v-row justify="center" align="center">
                      <v-col>
                        <v-img :src="image.url" :alt="product?.name" class="image"></v-img><span>{{ index }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false"> I accept </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="6">
        <h2>{{ name }}</h2>
        <p v-if="product?.discountedPrice">
          <span style="color: red; font-weight: bold">{{ product?.discountedPrice }}</span
          ><span style="color: red; font-weight: bold">{{ product?.currency }}</span
          >&nbsp;&nbsp;<span style="text-decoration: line-through; color: gray">{{ product?.price }}</span>
          <span style="text-decoration: line-through; color: gray">{{ product?.currency }}</span>
        </p>
        <p v-else>{{ product?.price }} {{ product?.currency }}</p>
        <p>Description: {{ product?.description }}</p>
        <p>Sizes: {{ product?.size }}</p>
        <p>Quantity: {{ product?.quantity }}</p>
        <p>Brand: {{ product?.attributes.find((attr: Attributes) => attr.name === 'brand')?.value }}</p>
        <v-btn v-if="product?.quantity || 0 > 0" class="btn"> Add to Cart </v-btn>
        <p v-else>This product sold</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.btn {
  width: fit-content;
  background-color: var(--red-secondary);
  color: var(--white-text);
}
.dialog-slider {
  .image {
    width: 100%;
    height: auto;
  }
}
.card-dialog {
  background-color: lightcoral;
}
.carousel-slider.v-carousel {
  height: max-content !important;
}
.carousel-slider :deep(.v-carousel-item) {
  height: fit-content;
}
.carousel-slider :deep(.v-img__img) {
  height: auto;
}
</style>
