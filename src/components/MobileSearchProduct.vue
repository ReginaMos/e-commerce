<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
  modelValue: string;
  onClear: () => void;
  getSearchQuery: (query: string) => void;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function updateValue(val: string) {
  emit('update:modelValue', val);
}

const { smAndDown } = useDisplay();
</script>

<template>
  <div class="input-mobile-wrapper" v-show="smAndDown">
    <v-text-field
      :model-value="props.modelValue"
      type="text"
      variant="plain"
      clearable
      label="What are you looking for?"
      class="search-mobile-input"
      persistent-clear
      clear-icon="mdi-close"
      @update:model-value="updateValue"
      @keydown.enter="props.getSearchQuery(props.modelValue)"
      @click:clear="props.onClear"
    ></v-text-field>
    <v-btn class="search-mobile-btn" v-show="smAndDown" variant="plain" @click="props.getSearchQuery(props.modelValue)">
      <v-icon> mdi-magnify </v-icon>
    </v-btn>
  </div>
</template>
<style scoped lang="scss">
.input-mobile-wrapper {
  position: fixed;
  top: 108px;
  z-index: 1004;
  border-top: 1px solid var(--gray-text-color);
  border-bottom: 1px solid var(--gray-text-color);
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  padding-left: var(--padding-horizontal-sm);
  padding-right: var(--padding-horizontal-sm);
  background-color: var(--white-background);
  @media screen and (min-width: 376.98px) {
    padding-left: var(--padding-horizontal-md);
    padding-right: var(--padding-horizontal-md);
  }
  @media screen and (min-width: 1024px) {
    min-width: var(--md);
    max-width: var(--xl);
    padding-left: var(--padding-horizontal-lg);
    padding-right: var(--padding-horizontal-lg);
  }
  @media screen and (min-width: 1200px) {
    padding-top: 202px;
  }
  @media screen and (min-width: 1440px) {
    width: var(--xl);
    padding-left: var(--padding-horizontal-xl);
    padding-right: var(--padding-horizontal-xl);
  }
}
.input-mobile-wrapper :deep(.search-mobile-input) {
  width: 100%;
  height: 40px;
}
.input-mobile-wrapper :deep(.v-field__input) {
  background-color: transparent;
  height: 40px;
  padding: 0;
  padding-left: 20px;
}
.input-mobile-wrapper :deep(.v-input) {
  padding: 0;
}
.input-mobile-wrapper :deep(.v-input__control) {
  background-color: transparent;
  border-radius: 12px;
  padding: 0;
}
.input-mobile-wrapper :deep(.v-label.v-field-label) {
  color: var(--gray-text-color);
  font-size: 12px;
  padding-left: 20px;
  bottom: 10px;
}
.input-mobile-wrapper :deep(.search-mobile-btn.v-btn) {
  min-width: 38px;
  min-height: 38px;
  max-height: 38px;
  background-color: transparent;
  padding: 0;
  height: 100%;
  color: var(--black-text);
  opacity: 1;
  &:hover {
    color: var(--white-text);
    background-color: var(--red-secondary);
    transition: background-color 0.28s ease-in-out;
  }
}
.input-mobile-wrapper :deep(.v-field__clearable) {
  padding: 0;
  margin: 0;
  height: 38px;
  align-items: center;
  justify-content: center;
}
::v-deep(.v-field__clearable .v-icon) {
  color: var(--black-text);
  font-size: 18px;
  opacity: 1 !important;
  &:hover,
  &:focus,
  &:active {
    color: var(--red-secondary);
  }
}
</style>
