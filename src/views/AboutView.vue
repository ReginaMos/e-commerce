<script setup lang="ts">
import AboutAdvantagesComponent from '../components/AboutAdvantagesComponent.vue';
import slideAbout from '../assets/about-page/slideAbout.png';
</script>
<template>
  <v-container>
    <v-row class="about-hero">
      <v-col class="about-hero-content">
        <h2 class="about-hero-heading">Our Story</h2>
        <p>
          Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in
          Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500
          sallers and 300 brands and serves 3 millioons customers across the region.
        </p>
        <p>
          Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse
          assotment in categories ranging from consumer.
        </p>
      </v-col>
      <v-col>
        <v-img :src="slideAbout" class="slide-about-image" />
      </v-col>
    </v-row>
    <AboutAdvantagesComponent />
  </v-container>
</template>
<style scoped lang="scss">
.v-col {
  padding: 0;
}
.about-hero {
  gap: 30px;
  flex-direction: column;
  margin-bottom: 50px;
  @media screen and (min-width: 578px) {
    /* gap: 50px; */
  }
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    margin-bottom: 140px;
  }
}
.about-hero-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  gap: 40px;

  font-size: 16px;

  @media screen and (min-width: 1200px) {
    padding-top: 137px;
    padding-right: 75px;
    padding-bottom: 137px;
    width: 525px;
  }
}
.about-hero-heading {
  font-size: 54px;
  line-height: 64px;
  letter-spacing: 0.06;
  font-weight: 500;
}
.slide-about-image {
  @media screen and (min-width: 1200px) {
    position: absolute;
    right: 0;
    max-width: 705px;
    min-width: 50%;
  }
}
</style>
