<script setup lang="ts">
import { ref } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <HeaderComponent />
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

  <v-btn>
    <router-link to="/login">Login</router-link>
  </v-btn>

  <FooterComponent />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
