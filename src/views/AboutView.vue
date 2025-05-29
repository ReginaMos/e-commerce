<script setup lang="ts">
import AboutAdvantagesComponent from '../components/AboutAdvantagesComponent.vue';
import slideAbout from '../assets/about-page/slideAbout.png';
import AboutFeaturesComponent from '../components/AboutFeaturesComponent.vue';
import AboutTeamComponent from '../components/AboutTeamComponent.vue';
</script>
<template>
  <v-container class="about-page-container">
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
      <v-col class="image-wrapper">
        <v-img :src="slideAbout" class="slide-about-image" />
      </v-col>
    </v-row>
    <AboutAdvantagesComponent />
    <AboutTeamComponent />
    <AboutFeaturesComponent />
  </v-container>
</template>
<style scoped lang="scss">

.about-page-container {
 padding-left: 0;
 padding-right: 0;
  padding-top: 50px;
  padding-bottom: 140px;
  width: 100%!important;
}

.about-hero {
  gap: 30px;
  flex-direction: column;
  height: auto;
  margin-bottom: 50px;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    height: 609px;
    margin-bottom: 140px;
    gap: 0;
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
    padding-bottom: 137px;
  }
}
.about-hero-heading {
  font-size: 54px;
  line-height: 64px;
  letter-spacing: 0.06;
  font-weight: 700;
}
.about-hero-content p {
  width: 100%;
  @media screen and (min-width: 1200px) {
    width: 525px;

  }
}
.v-col.image-wrapper  {
  padding: 0;
}
.slide-about-image {
  
  @media screen and (min-width: 1200px) {
    right: -15px;
    position: absolute;
    max-height: 609px;
    max-width: 705px!important;
    min-width: 50%;
    padding: 0;
  }
}

.slide-about-image :deep(.v-img__img) {
  position: static;
  width: 100%;
  @media screen and (min-width: 1200px) {
    right: -15px;
    position: absolute;
    max-height: 609px;
    width: 705px!important;
    min-width: 50%;
  }
}
</style>
