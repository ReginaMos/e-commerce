<script setup>
import { reactive } from 'vue';
defineProps({
  title: String,
  link: String,
});
const isAuth = reactive(false);
</script>

<template>
  <li v-if="isAuth ? link !== '/signup' : link">
    <RouterLink :to="link" class="menu-link" exact-active-class="active">
      {{ title }}
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
li {
  list-style: none;
}
.menu-link {
  text-decoration: none;
  color: black;
  /* margin-right: 48px; */
  &:hover {
    text-decoration: underline;
  }
}

.menu-link.active {
  text-decoration: underline;
  font-weight: bold;
}
</style>
