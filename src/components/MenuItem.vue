<template>
  <li>
    <RouterLink :to="link" class="">
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
