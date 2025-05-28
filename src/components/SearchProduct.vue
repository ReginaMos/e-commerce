<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
  modelValue: string,
  onClear: () => void
  getSearchQuery: (query: string) => void
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function updateValue(val: string) {
  emit('update:modelValue', val);
}
const { mdAndUp } = useDisplay();
</script>

<template>
  <div class="input-wrapper" v-show="mdAndUp">
    <v-text-field
      :model-value="props.modelValue"
      type="text"
      variant="plain"
      clearable
      label="What are you looking for?"
      class="search-input"
      persistent-clear
      clear-icon="mdi-close"
      @update:model-value="updateValue"
      @keydown.enter="props.getSearchQuery(props.modelValue)"
      @click:clear="props.onClear"
    />
    <v-btn class="search-btn"  v-show="mdAndUp" @click="props.getSearchQuery(props.modelValue)">
      <v-icon> mdi-magnify </v-icon>
    </v-btn>
  </div>
</template>
<style scoped lang="scss">
.input-wrapper {
  margin-right: 24px;
  width: 210px;
  max-width: 243px;
  height: 38px;
  display: flex;
  align-items: center;
  background-color: var(--gray-secondary);
  @media screen and (min-width: 1440px) {
    width: 243px;
  }
}
.search-input {
  height: 38px;
}
.search-input :deep(.v-field__input) {
  background-color: transparent;
  height: 38px;
  padding: 7px 12px 7px 20px;
}
.search-input :deep(.v-label) {
  color: var(--gray-text-color);
  font-size: 12px;
  padding-left: 20px;
}
.v-btn.search-btn {
  min-width: 38px;
  min-height: 38px;
  max-height: 38px;
  background-color: transparent;
  padding: 0;
  color: var(--black-text);
  &:hover {
    color: var(--white-text);
    background-color: var(--red-secondary);
    transition: background-color 0.28s ease-in-out;
  }
}
.search-input :deep(.v-field__clearable) {
  padding: 0;
  margin: 0;
  height: 38px;
  align-items: center;
  justify-content: center;
  
}
::v-deep(.v-field__clearable .v-icon) {
  color: var(--black-text);
  font-size: 18px;
  opacity: 1!important;
  &:hover,
  &:focus,
  &:active {
    color: var(--red-secondary)
  }
}
</style>
