<script setup lang="ts">
import AboutAdvantagesComponent from '../components/AboutAdvantagesComponent.vue';
import slideAbout from '../assets/about-page/slideAbout.png';
import AboutFeaturesComponent from '../components/AboutFeaturesComponent.vue';
import AboutTeamComponent from '../components/AboutTeamComponent.vue';
import { ref } from 'vue';

const isShowMore = ref(false);

function onShowMore() {
  isShowMore.value = !isShowMore.value;
}
</script>
<template>
  <v-container class="about-page-container">
    <v-row class="about-hero">
      <v-col class="about-hero-content">
        <h2 class="about-hero-heading">Our Story</h2>
        <p>
          Hi! We are an ambitious and highly promising team of Frontend developers. We began our "JavaScript/Front-end
          2024Q4" course at The Rolling Scopes School on October 27, 2024, and are set to complete it on June 24, 2025.
          Throughout the course, we worked hard to complete all tasks on time, reviewed our peers’ work responsibly,
          encouraged and supported one another, prepared for interviews, and spent countless hours studying, reading,
          and watching educational materials. We are truly grateful to RS School for all the opportunities, knowledge,
          and support we have received.
        </p>
        <v-btn @click="onShowMore" v-if="!isShowMore" variant="plain" class="show-btn"
          >Show more about our team...<span class="mdi mdi-arrow-down-bold"></span
        ></v-btn>
        <div v-if="isShowMore">
          <p class="mb-6">
            <strong>Regina Moiseeva</strong> was our Team Lead. She created the repository for our final project, added
            all dependencies, and set up the required configuration. She was the author of the Main page and the
            Catalog. She was contributed in categories, filtering and sorting. And as a Team Lead and experienced Vue's
            developer she helped with refactoring to improve code quality and maintanability.
          </p>
          <p class="mb-6">
            <strong>Yuriy Scrypal</strong> was the most responsible member of our team. He consistently wrote reports on
            completed work, updated the ClickUp board, monitored project dependencies, and critically evaluated
            unnecessary ones. He took ownership of user registration and personal account functionality, handled
            numerous forms, and wrote many tests. Yuri carefully reviewed every file in pull requests and provided
            thoughtful suggestions on how to make the code cleaner and more efficient.
          </p>
          <p class="mb-6">
            <strong>Viktoriia Rosovska</strong> demonstrated strong skills in layout and page styling. She developed the
            header, footer, product page, and the About Us page. Sometime she made commits and pull requests more often
            than necessary whitch required other team members to regularly review and help improve the code.
            Nevertheless, Viktoriia approached her tasks responsibly and was always ready to take on additional tasks
            and help her teammates.
          </p>
        </div>
        <v-btn v-if="isShowMore" @click="onShowMore" class="show-btn show-less-btn" variant="plain"
          >Show less <span class="mdi mdi-arrow-up-bold"></span
        ></v-btn>
        <a href="https://rs.school/" target="_blank" noopener noreferer class="school-link">
          <span class="school-logo">RS</span>&nbsp;&nbsp;
          <p class="school-advert">
            Want to grow as a professional? Start your journey with RS School<span
              class="mdi mdi-arrow-right"
            ></span></p
        ></a>
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
  width: 100% !important;
}

.about-hero {
  gap: 30px;
  flex-direction: column;
  height: auto;
  margin-bottom: 50px;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
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
.v-col.image-wrapper {
  padding: 0;
}
.slide-about-image {
  @media screen and (min-width: 1200px) {
    right: -15px;
    position: absolute;
    max-height: 609px;
    max-width: 705px !important;
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
    width: 705px !important;
    min-width: 50%;
  }
}
.school-advert {
  font-size: 16px;
  font-weight: 600;
  &:hover,
  &:focus,
  &:active {
    color: var(--red-secondary);
  }
}
.school-link {
  display: inline-flex;
  align-items: center;
}
.show-btn {
  text-transform: none;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  font-size: 18px;
}
.show-less-btn {
  justify-content: flex-end;
}
</style>
