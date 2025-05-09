<script setup lang="ts"></script>

<template>
  <div class="input-wrapper">
      <v-text-field
        type="input"
        variant="plain"
        clearable
        label="What are you looking for?"
        append-icon="mdi mdi-magnify"
        class="search-input hidden-sm-and-down"
      ></v-text-field>
    </div>
</template>

<style scoped>
.input-wrapper {
  margin-right: 24px;
  height: 38px;
  width: 243px;
}
.search-input :deep(.v-field__input) {
  height: 38px !important;
  padding-left: 20px;
  padding-bottom: 19px;
  background-color: transparent;
}
.search-input :deep(.v-field__outline) {
  height: 38px;
}
.search-input :deep(.v-label) {
  color: #7d8184;
  font-size: 12px;
  font-weight: 400;
  padding-left: 20px;
}
.search-input :deep(div.v-input__append) {
  padding: 0;
  margin: 0;
  padding-right: 12px;
  padding-left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>