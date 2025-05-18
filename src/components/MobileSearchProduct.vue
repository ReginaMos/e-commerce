<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
const { smAndDown } = useDisplay();
const searchQuery = ref('');
</script>

<template>
  <div class="input-mobile-wrapper" v-if="smAndDown">
    <v-text-field
      v-model="searchQuery"
      type="text"
      variant="plain"
      clearable
      label="What are you looking for?"
      class="search-mobile-input"
    ></v-text-field>
    <v-btn class="search-mobile-btn" v-if="smAndDown" variant="plain">
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
  /* height: 40px; */
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
</style>
