<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getProductById } from '../services/catalog';
import { onMounted, ref, computed, watch } from 'vue';
import type { ProductInfo, Attributes } from '../models/models';
import type { Ref, ComputedRef } from 'vue';
// import { useDisplay } from 'vuetify';
import ProductSizeComponent from '../components/ProductSizeComponent.vue';
import ProductQuantityComponent from '../components/ProductQuantityComponent.vue';

const route = useRoute();
const id = route.params.id;
const product = ref<ProductInfo | null>(null);
const sizes: ComputedRef<Array<string>> = computed(
  () =>
    product.value?.attributes
      .find((attr: Attributes) => attr.name === 'size')
      ?.value?.split(',')
      .map((s) => s.trim()) ?? []
);
const selectedSize: Ref<string, string> = ref(sizes.value[0] ?? 'One size');

watch(sizes, (newSizes) => {
  if (!newSizes.includes(selectedSize.value)) {
    selectedSize.value = newSizes[0] ?? 'One size';
  }
});

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
const currentSlide = ref(0);
const count = ref(1);
</script>

<template>
  <v-container class="product-page">
    <v-row class="product-page-container">
      <v-col>
        <v-dialog class="dialog-slider" v-model="dialog">
          <template v-slot:activator="{ props }">
            <v-carousel v-if="product?.images?.length" v-model="currentSlide">
              <v-carousel-item
                v-for="(image, index) in product?.images"
                :key="image.url"
                :value="image.url"
                :items-to-show="1"
              >
                <v-img :src="image.url" :alt="product?.name" v-bind="props"></v-img>
                <span class="current-slide-index">{{ index + 1 }}/{{ product?.images.length }}</span>
              </v-carousel-item>
            </v-carousel>
          </template>
          <v-card class="card-dialog">
            <v-card-title>
              {{ product?.name }}
            </v-card-title>
            <v-card-actions>
              <v-btn text @click="dialog = false" class="close-modal"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
            <v-carousel class="carousel-slider">
              <v-carousel-item
                v-for="(image, index) in product?.images"
                :key="image.url"
                :value="image.url"
                :items-to-show="1"
              >
                <v-sheet>
                  <v-card>
                    <v-row>
                      <v-col>
                        <v-img :src="image.url" :alt="product?.name" class="image"></v-img>
                        <span class="current-slide-index">{{ index + 1 }}/{{ product?.images.length }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col class="text-left product-content">
        <h2>{{ name }}</h2>
        <p v-if="product?.discountedPrice">
          <span style="color: var(--red-secondary); font-weight: bold">{{ product?.discountedPrice }}</span
          ><span style="color: var(--red-secondary); font-weight: bold">{{ product?.currency }}</span
          >&nbsp;&nbsp;<span style="text-decoration: line-through; color: gray">{{ product?.price }}</span>
          <span style="text-decoration: line-through; color: gray">{{ product?.currency }}</span>
        </p>
        <p v-else>{{ product?.price }} {{ product?.currency }}</p>
        <p>{{ product?.description }}</p>
        <v-divider></v-divider>
        <ProductSizeComponent v-model="selectedSize" :sizes="sizes" />

        <ProductQuantityComponent v-model="count" :min="1" :max="product?.quantity" />

        <p>
          Brand:&nbsp;<span class="brand">{{
            product?.attributes.find((attr: Attributes) => attr.name === 'brand')?.value
          }}</span>
        </p>
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
  width: fit-content;
}
.dialog-slider :deep(.v-img__img) {
  object-fit: scale-down !important;
  width: auto !important;
  height: auto !important;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
.dialog-slider :deep(.v-carousel__controls) {
  display: none;
}

.dialog-slider :deep(.v-responsive.v-img.image) {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  width: 100%;
  position: relative;
}
.card-dialog {
  background-color: var(--white-background);
  padding: 30px;
  max-width: auto!important;
  height: auto!important;
}
.carousel-slider.v-carousel {
  height: auto !important;
}

.product-page :deep(.v-carousel__controls) {
  display: none;
}
.product-page-container {
  flex-direction: column;
  align-items: flex-start;
  @media screen and (min-width: 748px) {
    flex-direction: row;
  }
}
.current-slide-index {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
.carousel-slider :deep(.current-slide-index) {
  position: absolute;
  bottom: 10%;
}
.product-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  white-space: pre-line;
  line-height: normal;
}
.brand {
  font-weight: bold;
}

.carousel-slider :deep(.v-overlay__content) {
  max-height: 80%;
  align-items: center;
}
.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
