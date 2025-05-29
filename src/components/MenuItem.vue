<script setup lang="ts">
import { useAuth } from '../services/customer-service';
import { MenuLinks } from '../constants/routersLinks';
defineProps({
  title: String,
  link: String,
});
const { isAuth } = useAuth();
</script>
<template>
  <li v-if="isAuth ? link !== MenuLinks.SIGNUP.LINK && link !== MenuLinks.LOGIN.LINK : link">
    <RouterLink v-if="link" :to="link" class="menu-link" exact-active-class="active">
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
  color: var(--black-text);
  &:hover {
    text-decoration: underline;
  }
}
.menu-link.active {
  text-decoration: underline;
  font-weight: bold;
}
</style>
