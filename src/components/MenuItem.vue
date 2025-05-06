<template>
  <li>
    <RouterLink :to="link" class="hover:underline" active-class="text-red-500 font-bold">
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
