<script setup lang="ts">
import { aboutTeam } from '../constants/aboutPage';
</script>
<template>
     <v-row class="team-wrapper">
    <v-col v-for="(teammate, ind) in aboutTeam" :key="ind">
      <div class="team-item">
        <v-img :src="teammate.img" class="about-team-image" />
        <h3>{{ teammate.heading }}</h3>
        <p>{{ teammate.text }}</p>
        <div class="socials">
          <a v-for="(social, ind) in teammate.socials" :key="ind" :href="social.link" target="_blank" rel="noopener noreferrer">
            <img :src="social.icon" alt="icon" width="24" height="24" class="team-icon"/>
          </a>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
 .team-item {
    width: 370px;
    text-align: left;
 }
 .team-item h3 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
 }
 .team-item p {
  margin-bottom: 16px;
 }
 .team-wrapper .v-col{
  margin-bottom: 50px;
 display: flex;
 justify-content: center;

  @media screen and (min-width: 1200px) {
    margin-bottom: 140px;
  }
  
 }
 .about-team-image {
  margin-bottom: 32px;
 }
.team-icon {
  width: 40px;
  height: 40px;
}
.socials {
  display: flex;
  gap: 16px;
}
</style>