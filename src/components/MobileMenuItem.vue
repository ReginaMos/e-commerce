<script setup>
import { useAuth } from '../services/customer-service';

defineProps({
  title: String,
  link: String,
});
const { isAuth } = useAuth();
</script>
<template>
  <v-list-item :value="link" link class="activeMenu" v-if="isAuth ? link !== '/signup' : link">
    <RouterLink :to="link" class="menu-link" style="width: 100%" exact-active-class="active">
      <v-list-item-title>{{ title }}</v-list-item-title>
    </RouterLink>
  </v-list-item>
</template>

<style scoped lang="scss">
.activeMenu .v-list-item-title {
  font-weight: 700;
  font-size: 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
}
.activeMenu.v-list-item.v-list-item--active {
  color: var(--red-secondary);
}

.activeMenu.v-list-item:hover,
.activeMenu.v-list-item:focus,
.activeMenu.v-list-item:active {
  background-color: var(--red-secondary);
  color: var(--white-text) !important;
}
</style>
