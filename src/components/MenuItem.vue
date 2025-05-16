<script setup>
import { useAuth } from '../services/customer-service';
defineProps({
  title: String,
  link: String,
});
const { isAuth } = useAuth();
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
