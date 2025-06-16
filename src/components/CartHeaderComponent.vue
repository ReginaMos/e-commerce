<script setup lang="ts">
import { useRouter } from 'vue-router';
import { activeCart } from '../services/carts-service';
import { computed } from 'vue';

const props = defineProps({
  mediasize: Boolean,
  link: String,
});
const router = useRouter();
const totalItems = computed(() => activeCart.value?.totalLineItemQuantity ?? 0);

function cartNavigateHandle() {
  if (props.link && typeof props.link === 'string') {
    router.push(props.link);
  }
}
</script>
<template>
  <div class="cart-wrapper" @click="cartNavigateHandle" v-if="mediasize">
    <v-btn class="icon-button">
      <v-icon icon="mdi mdi-cart-outline"></v-icon>
    </v-btn>
    <div class="cartCount" v-if="totalItems > 0">
      {{ totalItems }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart-wrapper {
  position: relative;
  width: 30px;
  height: 30px;
}
.cartCount {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--black-background);
  color: var(--white-text);
  font-size: 12px;
  cursor: pointer;
}
</style>
