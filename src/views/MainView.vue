<script setup lang="ts">
import AdvantagesComponent from '../components/AdvantagesComponent.vue';
import CarouselElement from '../elements/CarouselElement.vue';
</script>

<template>
  <div class="main-page">
    <CarouselElement />

    <div class="main-part">
      <v-container class="d-flex align-center">
        <div class="box"></div>
        <h2 class="main-part__title">Why Us?</h2>
      </v-container>

      <AdvantagesComponent />
    </div>
  </div>
</template>

<style scoped lang="sass">
.main-page
  padding: 30px

.main-part
  padding: 50px 0

  &__title
    color: #db4444
    text-transform: uppercase

  .box
    width: 10px
    height: 20px
    background-color: #db4444
    margin-right: 15px
</style>
