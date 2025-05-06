<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue';
import FooterComponent from './FooterComponent.vue';
</script>

<template>
  <HeaderComponent />
  <router-view />
  <FooterComponent />
</template>

<style scoped></style>
