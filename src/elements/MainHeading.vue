<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <v-container class="d-flex align-center">
    <div class="box"></div>
    <h2 class="title">{{ title }}</h2>
  </v-container>
</template>

<style scoped lang="sass">
.title
    color: #db4444
    text-transform: uppercase

.box
    width: 10px
    height: 20px
    background-color: #db4444
    margin-right: 15px
</style>
