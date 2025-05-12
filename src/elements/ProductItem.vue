<script setup lang="ts">
import type { ProductInfo } from '../models/models';

defineProps<{ item: ProductInfo }>();
</script>

<template>
    <div class="product">
        <div class="img-container">
            <img :src="item.imageUrl" alt="product-img">
            <div class="icons-part">
                <v-icon icon="mdi mdi-heart-outline"></v-icon>
                <v-icon icon="mdi mdi-eye-outline"></v-icon>  <!--Redirect to more-info-page-->
            </div>
            <div class="add-to-cart">
                Add To Cart
            </div>
        </div>    
        
        <h3 class="heading">
            {{ item.name }}
        </h3>
        <div class="price">
            {{ item.price }} {{ item.currency }}
        </div>
    </div>
</template>

<style scoped lang="sass">
.product
    cursor: pointer
    transition: all 0.3s ease

.img-container
    position: relative

.icons-part
    position: absolute
    left: 0
    top: 0

.add-to-cart
    display: none
    padding: 10px
    color: #fff
    background-color: #000

    position: absolute
    bottom: 0

.product:hover
    transform: scale(1.3)
    box-shadow: 4px 0px 16px 14px rgba(34, 60, 80, 0.2)

.product:hover .add-to-cart
    display: block
</style>