<script setup>
defineProps({
  title: String,
  link: String,
});
</script>

<template>
  <v-row>
    <v-col>
      <RouterLink :to="link">
        <v-btn class="catalog-btn">{{ title }}</v-btn>
      </RouterLink>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">
.catalog-btn
  color: #fff
  background-color: #db4444
  margin-top: 20px
</style>
