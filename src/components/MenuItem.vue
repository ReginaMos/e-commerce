<template>
  <li>
    <RouterLink
      :to="link"
      class="menu-link"
      exact-active-class="active"
    >
      {{ title }}
    </RouterLink>
  </li>
</template>

<script setup>
defineProps({
  title: String,
  link: String,
});
</script>

<style scoped>
.menu-link {
  text-decoration: none;
  color: black;
}

.menu-link:hover {
  text-decoration: underline;
}

.menu-link.active {
  text-decoration: underline;
  font-weight: bold;
}
</style>
