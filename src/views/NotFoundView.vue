<script setup lang="ts">
import { Links } from '../constants/routersLinks';
</script>

<template>
  <div class="not-found">
    <div class="text-part">
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
    </div>

    <RouterLink :to="Links.HOME.LINK">
      <v-btn class="btn"> Back to home page </v-btn>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  & h1 {
    font-size: 34px;
  }
  @media screen and (min-width: 576px) {
    & h1 {
      font-size: 70px;
      width: 500px;
    }
  }
  @media screen and (min-width: 1024px) {
    & h1 {
      width: 829px;
      font-size: 110px;
    }
  }
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
  background-color: var(--red-secondary);
  color: var(--white-text);
}
</style>
