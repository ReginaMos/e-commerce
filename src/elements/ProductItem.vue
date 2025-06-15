<script setup lang="ts">
import type { ProductInfo } from '../models/models';
import { ref } from 'vue';
import { addProductToCart, activeCart } from '../services/carts-service';
import { debounce } from '../utils/debounce';
import { updateCartItemQuantity } from '../services/carts-service';

const props = defineProps<{ item: ProductInfo }>();
const emit = defineEmits<{
  (e: 'update-quantity', quantity: number): void;
}>();
const debouncedUpdateCart = debounce(updateCartItemQuantity, 300);

let favorIcon = ref('mdi-heart-outline');

function addToFavor(): void {
  favorIcon.value = favorIcon.value === 'mdi-heart' ? 'mdi-heart-outline' : 'mdi-heart';
}

function increaseItemCount(): void {
  const count = props.item.inCartQuantity + 1;
  emit('update-quantity', count);
  const lineItem = activeCart.value?.lineItems.find(item => item.productId === props.item?.id);
  if (!activeCart.value || !lineItem) return;
  debouncedUpdateCart(activeCart.value, lineItem?.id, count);
}

function decreaseItemCount(): void {
  const count = props.item.inCartQuantity - 1;
  emit('update-quantity', count);
  const lineItem = activeCart.value?.lineItems.find(item => item.productId === props.item?.id);
  if (!activeCart.value || !lineItem) return;
  debouncedUpdateCart(activeCart.value, lineItem?.id, count);
}

async function addToCart(): Promise<void> {
  const count = props.item.inCartQuantity + 1;
  emit('update-quantity', count);
  await addProductToCart(props.item.id, 1, 1);
}
</script>

<template>
  <v-col class="product" cols="12" sm="4" md="3">
    <div v-if="item.discountedPrice" class="discount">SALE!</div>

    <div class="main-part">
      <div class="img-container">
        <img :src="item.images[0].url" alt="product-img" class="product-img" />
        <div v-if="item.inCartQuantity" class="added-to-cart">
          <v-btn @click.stop="decreaseItemCount">
            <v-icon> mdi-minus-circle-outline </v-icon>
          </v-btn>
          <p>{{ item.inCartQuantity }}</p>
          <v-btn @click.stop="increaseItemCount" :disabled="item.inCartQuantity === item.quantity">
            <v-icon> mdi-plus-circle-outline </v-icon>
          </v-btn>
        </div>

        <div v-if="item.quantity > 0 && item.inCartQuantity === 0" class="add-to-cart" @click.stop="addToCart()">
          Add To Cart
        </div>
      </div>

      <div class="icons-part">
        <v-icon @click.stop="addToFavor()" size="30"> {{ favorIcon }}</v-icon>
      </div>

      <h3 class="heading">
        {{ item.name }}
      </h3>
    </div>

    <div class="price-container">
      <span class="price">Price:</span>
      <p v-if="item.discountedPrice">
        <span class="discounted-price"> {{ item.discountedPrice }}&nbsp;{{ item.currency }}&nbsp; </span>
        <span class="prev-price"> {{ item.price }}&nbsp;{{ item.currency }} </span>
      </p>
      <p v-else>{{ item.price }} {{ item.currency }}</p>
    </div>
  </v-col>
</template>

<style scoped lang="sass">
.product
    cursor: pointer
    transition: all 0.3s ease
    background-color: #f2eeee
    border: 1px solid #cdcdc2
    border-radius: 16px
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center

.img-container
    position: relative
    margin-bottom: 15px
    display: flex
    align-items: center
    justify-content: center

    img
      max-height: 40vh
      width: fit-content
      align-self: center

.icons-part
    position: absolute
    right: 10px
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

.added-to-cart
    display: none
    padding: 10px
    background-color: #000
    width: 100%

    position: absolute
    bottom: 0

    justify-content: space-around
    align-items: center

    p
      color: #fff
      padding: 0 15px

.price-container
  display: flex
  align-items: center
  justify-content: center
  gap: 15px

  p
    font-weight: 500

.discount
  position: absolute
  left: 0
  top: 0
  padding: 10px
  background-color: #db4444
  color: #fff
  z-index: 100
  border-top-left-radius: 12px

.discounted-price
  color: #db4444
  font-weight: 500

.prev-price
  color: gray
  text-decoration: line-through
  font-weight: 400

.price
    color: #db4444
    font-weight: 600

.product:hover
    transform: scale(1.1)
    box-shadow: 4px 0px 16px 14px rgba(34, 60, 80, 0.2)

.product:hover .add-to-cart
    display: block

.product:hover .added-to-cart
  display: flex
</style>
