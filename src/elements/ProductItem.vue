<script setup lang="ts">
import type { ProductInfo } from '../models/models';
import { ref } from 'vue';

defineProps<{ item: ProductInfo }>();

let favorIcon = ref('mdi-heart-outline');

function addToFavor(): void {
  favorIcon.value = favorIcon.value === 'mdi-heart' ? 'mdi-heart-outline' : 'mdi-heart';
}

function addToCart(): void {
  console.log('Add to Cart');
  
}
</script>

<template>
  <v-col class="product">
    <div class="img-container">
      <img :src="item.imageUrl" alt="product-img" class="product-img"/>
      <div class="icons-part">
        <v-icon @click="addToFavor()" size="30"> {{ favorIcon }}</v-icon>
        <v-icon icon="mdi mdi-eye-outline" size="30"></v-icon>
        <!--Redirect to more-info-page-->
      </div>
      <div class="add-to-cart" @click="addToCart()">Add To Cart</div>
    </div>

    <h3 class="heading">
      {{ item.name }}
    </h3>
    <div class="price">
      <span>Price:</span> {{ item.price }} {{ item.currency }}
    </div>
  </v-col>
</template>

<style scoped lang="sass">
.product
    cursor: pointer
    transition: all 0.3s ease

    max-width: 25%

    background-color: #f2eeee
    border: 1px solid #cdcdc2
    border-radius: 16px

.img-container
    position: relative
    margin-bottom: 15px

    img
      max-height: 40vh
      width: fit-content
      align-self: center

.icons-part
    position: absolute
    right: 5px
    top: 10px

    display: flex
    flex-direction: column
    gap: 10px

.add-to-cart
    display: none
    padding: 10px
    color: #fff
    background-color: #000
    width: 100%

    position: absolute
    bottom: 0

.price
  span
    color: #db4444
    font-weight: 600

.product:hover
    transform: scale(1.2)
    box-shadow: 4px 0px 16px 14px rgba(34, 60, 80, 0.2)

.product:hover .add-to-cart
    display: block
</style>
