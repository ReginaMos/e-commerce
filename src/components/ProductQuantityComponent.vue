<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal;
  }
);

function increment() {
  if (internalValue.value + props.step <= props.max) {
    emit('update:modelValue', internalValue.value + props.step);
  }
}
function decrement() {
  if (internalValue.value + -props.step >= props.min) {
    emit('update:modelValue', internalValue.value - props.step);
  }
}
function onInputChange() {
  let val = Number(internalValue);
  if (isNaN(val)) val = props.min;
  if (val < props.min) val = props.min;
  if (val > props.max) val = props.max;
  emit('update:modelValue', val);
}
</script>

<template>
  <div class="d-flex align-center plus-minus-counter">
    <v-btn icon @click="decrement" :disabled="internalValue <= min" variant="plain" :ripple="false">
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <v-text-field
      v-model="internalValue"
      type="text"
      readonly
      class="plus-minus-input"
      :min="min"
      :max="max"
      @change="onInputChange"
      hide-details
      variant="plain"
    />

    <v-btn :ripple="false" icon @click="increment" :disabled="internalValue >= max">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
  <!-- <p>Quantity: {{ max }}</p> -->
</template>

<style scoped lang="scss">
.plus-minus-counter {
  border: 1px solid black;
  border-radius: 5px;
  width: 160px;
  height: 44px;
  display: flex;
  align-items: center;
}
button {
  width: 40px;
  height: fit-content;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  opacity: 1;
  background: transparent;
  box-shadow: none;
  padding: 0;
  &:active,
  &:hover,
  &:focus {
    color: var(--red-secondary);
    background-color: none;
  }
}
.v-ripple__container {
  background-color: none;
}
.plus-minus-counter :deep(.v-btn.v-btn--density-default) {
  height: fit-content;
  width: 40px;
  background-color: transparent;
  box-shadow: none;
}

.plus-minus-counter :deep(.v-btn__overlay) {
  background-color: transparent;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.plus-minus-input {
  background-color: transparent;
  border: 1px solid black;
  height: 44px;
  width: 80px;
}
.plus-minus-input :deep(.v-input__control) {
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 44px;
  background-color: transparent;
  text-align: center;
}
.plus-minus-input :deep(.v-field__field) {
  min-height: 44px;
  padding: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
}
.plus-minus-input :deep(.v-field__input) {
  padding: 0px;
  text-align: center;
  vertical-align: middle;
  background-color: transparent;

  display: flex;
  justify-content: center;
}
.plus-minus-input :deep(.v-field--variant-filled.v-field__overlay) {
  background-color: none;
}
.no-style-input .v-field {
  background-color: transparent;
  box-shadow: none;
  border: none;
}

.no-style-input .v-field__outline,
.no-style-input .v-field__underlay,
.no-style-input .v-field__overlay {
  display: none !important;
}
</style>
