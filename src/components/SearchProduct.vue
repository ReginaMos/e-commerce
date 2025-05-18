<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { lgAndUp } = useDisplay();
</script>

<template>
  <div class="input-wrapper" v-if="lgAndUp">
    <v-text-field
      type="input"
      variant="plain"
      clearable
      label="What are you looking for?"
      class="search-input"
    ></v-text-field>
    <v-btn class="search-btn" v-if="lgAndUp">
      <v-icon> mdi-magnify </v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
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
/* .search-input :deep(.v-field__outline) {
  height: 38px;
} */
.search-input :deep(.v-label) {
  color: var(--gray-text);
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
</style>
