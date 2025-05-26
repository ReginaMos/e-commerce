<script setup lang="ts">
defineProps({
  price: Number,
  discountedPrice: Number,
  currency: String,
});
</script>
<template>
  <p v-if="discountedPrice">
    <span class="red-ligthing-price">{{ discountedPrice }}</span
    ><span class="red-ligthing-price">{{ currency }}</span
    >&nbsp;&nbsp;<span class="gray-through-price">{{ price }}</span>
    <span class="gray-through-price">{{ currency }}</span>
  </p>
  <p v-else>{{ price }} {{ currency }}</p>
</template>
<style scoped lang="scss">
.red-ligthing-price {
  color: var(--red-secondary);
  font-weight: bold;
}
.gray-through-price {
  text-decoration: line-through;
  color: var(--gray-text-color);
}
</style>
