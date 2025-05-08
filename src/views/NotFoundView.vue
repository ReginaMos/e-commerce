<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>

<template>
  <HeaderComponent />

  <div class="not-found">
    <div class="text-part">
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
    </div>

    
    <RouterLink to="/">
      <v-btn class="btn">
        Back to home page 
      </v-btn>
    </RouterLink>
  </div>

  <FooterComponent />
</template>4

<style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    padding: 80px;
  }

  .text-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  .btn {
    width: fit-content;
  }
</style>
