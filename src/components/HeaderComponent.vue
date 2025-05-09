<script setup>
import MenuItem from './MenuItem.vue';
import { RouterLink } from 'vue-router';
import { Links, MenuLinks } from '../constants/routersLinks.ts';
import SearchProduct from './SearchProduct.vue';
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

    <SearchProduct />

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

<style scoped>
.header :deep(.v-toolbar__content) {
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
.header :deep(.v-btn--icon.v-btn--density-default) {
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
  margin-right: auto;
  font-weight: bold;
  font-size: 24px;
  &:hover {
    color: #db4444;
    text-decoration: none !important;
  }
}
.header :deep(.v-toolbar-title__placeholder) {
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

.header :deep(.v-navigation-drawer__content::-webkit-scrollbar-track) {
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.header :deep(.v-navigation-drawer__content::-webkit-scrollbar) {
  width: 0px;
}
.header :deep(.v-navigation-drawer__content::-webkit-scrollbar-thumb) {
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
.active {
  text-decoration: underline;
}
.icon-wrapper {
  display: flex;
  gap: 16px;
}
.header :deep(.v-btn.icon-button) {
  min-width: 32px;
  max-width: 32px;
  max-height: 32px;
  padding: 0;
  border-radius: 50%;
  &:hover {
    color: white;
    background-color: #db4444;
    transition: background-color 0.28s ease-in-out;
  }
}
.header :deep(.search-input) {
  background-color: #f5f5f5;
  height: 38px;
  width: 243px;
}
.header :deep(.v-input--density-default) {
  --v-input-control-height: 38px;
  --v-input-padding-top: 9px;
}
.header :deep(.v-input__control) {
  height: 38px;
}
</style>
