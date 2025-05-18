<script setup>
import MenuItem from './MenuItem.vue';
import MobileMenuItem from './MobileMenuItem.vue';
import { RouterLink } from 'vue-router';
import { Links, MenuLinks, MobileMenuLinks } from '../constants/routersLinks.ts';
import SearchProduct from './SearchProduct.vue';
import { useDisplay } from 'vuetify';
import { ref, watch } from 'vue';
import { useAuth } from '../services/customer-service.ts';

const { isAuth, logoutCustomer } = useAuth();
const { mdAndDown, lgAndUp, smAndUp } = useDisplay();

const drawer = ref(false);
watch(drawer, (newVal) => {
  if (newVal) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
});

const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>
<template>
  <v-navigation-drawer class="mobile-menu-drawer" v-model="drawer" absolute bottom temporary v-if="mdAndDown">
    <v-list nav dense>
      <v-item-group v-model="group" active-class="activeMenu">
        <MobileMenuItem v-for="item in MobileMenuLinks" :key="'#' + item.LINK" :title="item.NAME" :link="item.LINK" />
        <v-btn v-if="isAuth" variant="plain" class="mobile-menu-logaut" @click="logoutCustomer"
          ><span>Logout&nbsp;</span><v-icon size="18">mdi-logout</v-icon></v-btn
        >
      </v-item-group>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar :elevation="0" class="header" height="94">
    <v-app-bar-nav-icon v-if="mdAndDown" class="mobile-menu" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title class="header-logo">
      <RouterLink :to="MenuLinks.HOME.LINK">Vue Magic Time</RouterLink>
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
      <v-btn class="icon-button" v-if="smAndUp" :to="Links.LIKES.LINK">
        <v-icon icon="mdi mdi-heart-outline"></v-icon>
      </v-btn>
      <v-btn class="icon-button" v-if="smAndUp" :to="Links.CART.LINK">
        <v-icon icon="mdi mdi-cart-outline"></v-icon>
      </v-btn>
      <v-btn class="icon-button" v-if="smAndUp && isAuth" :to="Links.USER.LINK">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
      <v-btn v-if="isAuth" class="logout-button" @click="logoutCustomer"
        ><span v-if="smAndUp">Logout&nbsp;</span><v-icon size="18">mdi-logout</v-icon></v-btn
      >
    </div>
  </v-app-bar>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  position: fixed;
  top: 48px !important;
  border-bottom: 1px solid var(--black-background);
}
.header :deep(.v-toolbar__content) {
  background-color: var(--white-background);
  padding-top: var(--padding-top-sm);
  padding-bottom: 8px;
  padding-left: var(--padding-horizontal-sm);
  padding-right: var(--padding-horizontal-sm);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-width: var(--xs);
  max-width: var(--xl);
  margin: 0 auto;
  height: 60px !important;
  @media screen and (min-width: 376.98px) {
    padding-left: var(--padding-horizontal-md);
    padding-right: var(--padding-horizontal-md);
  }
  @media screen and (min-width: 1024px) {
    padding-left: var(--padding-horizontal-lg);
    padding-right: var(--padding-horizontal-lg);
  }
  @media screen and (min-width: 1200px) {
    height: 94px !important;
    padding-top: 40px;
    padding-bottom: 16px;
  }
  @media screen and (min-width: 1440px) {
    padding-left: var(--padding-horizontal-xl);
    padding-right: var(--padding-horizontal-xl);
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
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 376px) {
    gap: 0;
  }
}
.header :deep(.v-btn.icon-button) {
  min-width: 32px;
  max-width: 32px;
  max-height: 32px;
  padding: 0;
  border-radius: 50%;
  background-color: transparent;
  &:hover {
    color: var(--white-text);
    background-color: var(--red-secondary);
    transition: background-color 0.28s ease-in-out;
  }
}
.icon-button.v-btn.v-btn--active.v-btn__overlay {
  background-color: transparent !important;
}
.header :deep(.v-input--density-default) {
  --v-input-control-height: 38px;
  --v-input-padding-top: 9px;
}
.header :deep(.v-input__control) {
  height: 38px;
}
.logout-button {
  min-width: fit-content;
  text-transform: none;
  font-size: 16px;
  padding: 0 8px;
  letter-spacing: 0;
  &:hover {
    color: var(--white-text);
    background-color: var(--red-secondary);
  }
}

.mobile-menu-drawer {
  padding: 48px 0px;
}
.mobile-menu-logaut.v-btn {
  width: 100%;

  padding-left: 28px;
  height: 48px;
  justify-content: start;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: bold;
  color: var(--black-text);
  opacity: 1;
  &:hover {
    background-color: var(--red-secondary);
    color: var(--white-text);
  }
}
</style>
