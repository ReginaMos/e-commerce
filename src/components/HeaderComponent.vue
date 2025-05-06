<script setup>
import MenuItem from './MenuItem.vue';
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const menuList = [
  { title: 'Home', link: '/' },
  { title: 'Contacts', link: '/contacts' },
  { title: 'About', link: '/about' },
  { title: 'Sign Up', link: '/signup' },
];
let width = ref(false);
function  onResize() {
  return width.value = document.documentElement.clientWidth > 948
}


document.addEventListener('resize', () => {
  onResize();
})
</script>

<template>
  <v-app-bar :elevation="0" class="header">
     <v-app-bar-nav-icon v-resize="onResize"></v-app-bar-nav-icon>
      <v-app-bar-title class="header-logo-wrapper"> 
        <RouterLink :to="'/'" class="">
          Vue Magic Time
        </RouterLink>
      </v-app-bar-title>
       <v-navigation-drawer width="308" v-if="onResize" clipped-rigth app permanent>
        <ul class="list">
          <MenuItem v-for="item in menuList" :key="item.title" :title="item.title" :link="item.link" />
        </ul>
      </v-navigation-drawer>
      <v-text-field
             
          label="What are you looking for?"
          v-if="onResize"
          append-icon="mdi mdi-magnify"
          class="search-input">
      </v-text-field>
       <div class="" v-if="onResize">
          <v-btn class="icon-button">
            <RouterLink :to="'/likes'" class="">
          <v-icon icon="mdi mdi-heart-outline"></v-icon>
        </RouterLink>
          </v-btn>
          <v-btn class="icon-button">
             <RouterLink :to="'/cart'" class="">
                <v-icon icon="mdi mdi-cart-outline"></v-icon>
              </RouterLink>
          </v-btn>
        </div> 
  </v-app-bar>
</template>

<style>
.v-toolbar__content {
  background-color: white;
  padding-top: 40px;
  padding-bottom: 16px;
  padding-left: 135px;
  padding-right: 135px;
  display: flex;
  height: 94px!important;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
}
.header-logo-wrapper {
  min-width: 50px!important;
}
.v-toolbar-title__placeholder {
  overflow: visible;
  text-overflow: inherit;
  white-space: nowrap;
  min-width: 50px!important;
}
.v-navigation-drawer {
   position: static!important;
   margin-left: auto;
   width: 400px!important;
   overflow: hidden;
   height: 24px!important;
   
}
.v-navigation-drawer__content::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar{
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}

.list {
  display: flex;
  width: 308px!important;
  gap: 48px;
  height: 24px!important;
  
}
li {
  list-style: none;
}
.active {
  text-decoration: underline;
}
.v-btn.icon-button {
  width: 32px;
  height: 32px;
  color: inherit!important;
}
 .v-btn.icon-button:hover {
  color: red;
  background-color: none!important;
 }
 .search-input {
  position: relative;
  background-color: #F5F5F5;
  height: 38px;
  width: 243px;
 
  margin-right: 24px;
  
 }
 .v-input__control {
  height: 38px;
  width: 243px;
 }
 .search-input .v-field__input {
  padding: 0;
  margin: 0;
  width: 243px;
 }
 .search-input .v-field__outline {
  height: 100%;
  width: 243px;
  height: 38px;
  background-color: #F5F5F5;
 }

 .search-input .v-label {
  padding: 0;
  color: #7D8184;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
 }
.v-input {
  height: 100%;
  width: 50px;
 }

 .search-input .v-input__append {
  position: absolute;
  right: 12px;
  top: 7px;
 }


</style>
