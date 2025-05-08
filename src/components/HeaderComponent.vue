<script setup>
import MenuItem from './MenuItem.vue';
import { RouterLink } from 'vue-router';
import { Links, MenuLinks } from '../constants/routersLinks.ts';

</script>

<template>
  <v-app-bar :elevation="0" class="header">
    <v-app-bar-nav-icon class="hidden-lg-and-up"></v-app-bar-nav-icon>
    <v-app-bar-title class="header-logo">
      <RouterLink :to="MenuLinks.HOME.LINK" class=""> Vue Magic Time </RouterLink>
    </v-app-bar-title>
    <div class="menu-wrapper-desktop">
      <v-navigation-drawer class="hidden-md-and-down" min-width="278">
        <ul class="list">
          <MenuItem v-for="item in MenuLinks" :key="item.LINK" :title="item.NAME" :link="item.LINK"></MenuItem>
        </ul>
      </v-navigation-drawer>
    </div>
    
    <div class="input-wrapper">
      <v-text-field
        label="What are you looking for?"
        append-icon="mdi mdi-magnify"
        class="search-input hidden-sm-and-down"
      ></v-text-field>
    </div>

    <div class="icon-wrapper">
      <v-btn class="icon-button">
        <RouterLink :to="Links.LIKES.LINK" class="">
          <v-icon icon="mdi mdi-heart-outline"></v-icon>
        </RouterLink>
      </v-btn>
      <v-btn class="icon-button">
        <RouterLink :to="Links.CART.LINK" class="">
          <v-icon icon="mdi mdi-cart-outline"></v-icon>
        </RouterLink>
      </v-btn>
      <v-btn class="icon-button">
        <RouterLink :to="Links.USER.LINK">
          <v-icon>mdi-account-outline</v-icon>
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
  height: 94px !important;
  flex-direction: row;
  align-items: flex-end !important;
  border-bottom: 1px solid black;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}
.header .v-btn--icon.v-btn--density-default {
  width: 32px;
  height: 32px;
  padding: 0;
  margin-inline-start: 0px;
  margin-right: 48px;
}
.header-logo {
  padding: 0;
  min-width: 150px;
  max-width: 150px !important;
  margin-inline-start: 0px !important;
  margin-right: auto;
}

.v-toolbar__content > .header.logo.v-toolbar-title {
  margin-inline-start: 0;
}
.header-logo .v-toolbar-title__placeholder {
  min-width: 150px;
}
.header-logo:hover a {
  color: #db4444;
  text-decoration: none !important;
}
.v-toolbar-title__placeholder {
  overflow: visible;
  text-overflow: inherit;
  white-space: nowrap;
  min-width: 150px !important;
}
.menu-wrapper-desktop {
  width: 367px;
  margin-right: 130px;
}
.menu-wrapper-desktop .v-navigation-drawer {
  position: static !important;
  height: 24px !important;
  border-right-width: 0 !important;
  width: 367px !important;
}

.menu-wrapper-desktop .v-navigation-drawer__content {
  min-width: 367px !important;
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
.list {
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  letter-spacing: 0;
  font-size: 16px;
  gap: 48px;
}
li {
  list-style: none;
}
.active {
  text-decoration: underline;
}
.icon-wrapper {
  display: flex;
  gap: 16px;
}
.v-btn.icon-button {
  min-width: 32px;
  max-width: 32px;
  max-height: 32px;
  padding: 0;
}
.v-btn.icon-button:hover {
  color: white;
  border-radius: 50%;
  background-color: #db4444;
  transition: background-color 0.28s ease-in-out;
}
.v-btn.icon-button:hover > .v-btn__overlay {
  opacity: 0;
}
.search-input {
  position: relative;
  background-color: #f5f5f5;
  height: 38px;
  width: 243px;
  top: 0;

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
  background-color: #f5f5f5;
}

.search-input .v-label {
  padding: 0;
  color: #7d8184;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
}

.search-input .v-input__append {
  position: absolute;
  right: 12px;
  top: 7px;
}
</style>
