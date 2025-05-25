<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  sizes: string[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const internalSelectedSize = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    internalSelectedSize.value = newVal;
  }
);

watch(internalSelectedSize, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>

<template>
  <div class="size-selector">
    <p>Size:</p>
    <v-btn-toggle v-model="internalSelectedSize" mandatory>
      <v-btn
        v-for="size in sizes"
        :key="size"
        :value="size"
        depressed
        :class="{ selected: internalSelectedSize === size }"
      >
        {{ size }}
      </v-btn>
    </v-btn-toggle>
  </div>
  <!-- <p class="mt-4">Selected: {{ selectedSize }}</p> -->
</template>
<style scoped lang="scss">
.size-selector {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 32px;
}
.size-selector :deep(.v-btn-group) {
  gap: 10px;
  border-radius: 0px;
  height: fit-content;
}

.size-selector :deep(.v-btn) {
  padding: 6px 7px;
  min-width: fit-content;
  border-radius: 5px;
}
.size-selector :deep(.v-btn.v-btn--active) {
  background-color: var(--red-secondary);
  color: var(--white-text);
}
</style>
