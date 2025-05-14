<script setup>
import MenuItem from './MenuItem.vue';
import { RouterLink } from 'vue-router';
import { Links, MenuLinks } from '../constants/routersLinks.ts';
import SearchProduct from './SearchProduct.vue';
import { useDisplay } from 'vuetify';

const { mdAndDown, lgAndUp, smAndUp } = useDisplay();
const isAuth = true;
</script>

<template>
  <v-app-bar :elevation="0" class="header" height="94">
    <v-app-bar-nav-icon v-if="mdAndDown" class="mobile-menu"></v-app-bar-nav-icon>
    <v-app-bar-title class="header-logo">
      <RouterLink :to="MenuLinks.HOME.LINK" class=""> Vue Magic Time </RouterLink>
    </v-app-bar-title>
    <div class="menu-wrapper-desktop">
      <v-navigation-drawer v-if="lgAndUp" min-width="278">
        <ul class="list">
          <MenuItem v-for="item in MenuLinks" :key="item.LINK" :title="item.NAME" :link="item.LINK"></MenuItem>
        </ul>
      </v-navigation-drawer>
    </div>

    <SearchProduct />

    <div class="icon-wrapper">
      <v-btn v-if="mdAndDown" class="icon-button">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn class="icon-button" v-if="smAndUp">
        <RouterLink :to="Links.LIKES.LINK" class="">
          <v-icon icon="mdi mdi-heart-outline"></v-icon>
        </RouterLink>
      </v-btn>
      <v-btn class="icon-button" v-if="smAndUp">
        <RouterLink :to="Links.CART.LINK" class="">
          <v-icon icon="mdi mdi-cart-outline"></v-icon>
        </RouterLink>
      </v-btn>
      <v-btn class="icon-button" v-if="smAndUp">
        <RouterLink :to="Links.USER.LINK">
          <v-icon>mdi-account-outline</v-icon>
        </RouterLink>
      </v-btn>
      <v-btn v-if="isAuth ? true : false" class="logout-button"> Logout </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
}
.header :deep(.v-toolbar__content) {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: 60px !important;
  @media screen and (min-width: 376.98px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media screen and (min-width: 1024px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @media screen and (min-width: 1200px) {
    height: 94px !important;
    padding-top: 40px;
    padding-bottom: 16px;
  }
  @media screen and (min-width: 1440px) {
    padding-left: 135px;
    padding-right: 135px;
  }
}
.header :deep(.v-btn--icon.v-btn--density-default.mobile-menu) {
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  margin-inline-start: 0px;
  margin-right: 30px;
}

.header :deep(.header-logo.v-toolbar-title) {
  margin-inline-start: 0;
  padding: 0;
  margin-right: auto;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    color: var(--red-secondary);
    text-decoration: none !important;
  }
  @media screen and (min-width: 1024px) {
    font-size: 18px;
    margin-right: auto;
  }
  @media screen and (min-width: 1440px) {
    font-size: 24px;
  }
}
.header :deep(.v-toolbar-title__placeholder) {
  overflow: visible;
  text-overflow: inherit;
  white-space: nowrap;
  text-align: start;
  margin-inline-start: 0;
}
.menu-wrapper-desktop {
  width: 367px !important;
  margin-right: 40px;
}
.header :deep(.menu-wrapper-desktop .v-navigation-drawer) {
  position: static !important;
  border-right-width: 0 !important;
  width: 367px !important;
}
/* .header :deep(.menu-wrapper-desktop .v-navigation-drawer__content) {
  min-width: 367px !important;
} */

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
  align-items: center;
  justify-content: flex-end;
  /* height: 38px; */
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

.header :deep(.v-input--density-default) {
  --v-input-control-height: 38px;
  --v-input-padding-top: 9px;
}
.header :deep(.v-input__control) {
  height: 38px;
}
.logout-button {
  text-transform: none;
  font-size: 16px;
  padding: 0;
  letter-spacing: 0;
  &:hover {
    color: var(--white-text);
    background-color: var(--red-secondary);
  }
}
</style>
