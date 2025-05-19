<script setup lang="ts">
import { Links } from '../constants/routersLinks';
import { useDisplay } from 'vuetify';
const { mdAndUp } = useDisplay();
</script>

<template>
  <v-footer class="footer">
    <v-container fluid>
      <v-row>
        <v-col cols="auto">
          <v-list>
            <v-list-subheader class="logo"> Vue Magic Time </v-list-subheader>
          </v-list>
        </v-col>
        <v-col cols="auto">
          <v-list class="address">
            <v-list-subheader v-if="mdAndUp"> Support </v-list-subheader>

            <v-list-item> Pl. Virgen Blanca 67, Barcelona, 08650, Spain. </v-list-item>
            <v-list-item> vue_magic_time@gmail.com </v-list-item>
            <v-list-item> +34 780 064 048 </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="auto">
          <v-list>
            <v-list-subheader v-if="mdAndUp"> Account </v-list-subheader>
            <v-list-item>
              <router-link :to="Links.USER.LINK"> My account </router-link>
            </v-list-item>
            <v-list-item>
              <router-link :to="Links.SIGNUP.LINK">Sign Up</router-link>
            </v-list-item>
            <v-list-item>
              <router-link :to="Links.LOGIN.LINK">Login</router-link>
            </v-list-item>
            <v-list-item>
              <router-link :to="Links.CART.LINK">Shop Cart</router-link>
            </v-list-item>
            <v-list-item>
              <router-link :to="Links.LIKES.LINK">Wishlist</router-link>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="auto">
          <v-list>
            <v-list-subheader v-if="mdAndUp"> Quick Link </v-list-subheader>
            <v-list-item>
              <router-link :to="Links.CATALOG.LINK"> Catalog </router-link>
            </v-list-item>
            <v-list-item>
              <router-link :to="Links.CONTACT.LINK">Contact</router-link>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <v-card class="footer-copyright">
      <span class="school-logo">RS</span>
      <span class="school-link">
        <a href="https://rs.school/" target="_blank" noopener noreferer
          >&nbsp;&nbsp;Copyright RS-School 2025. All right reserved</a
        >
      </span>
    </v-card>
  </v-footer>
</template>

<style scoped lang="scss">
.footer.v-footer {
  background-color: var(--black-background);
  color: var(--white-text);
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.footer :deep(.v-container) {
  margin: 0;
  padding: 0;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  max-width: var(--xl);
  margin: 0 auto;
  @media screen and (min-width: 376.98px) {
    padding-left: var(--padding-horizontal-md);
    padding-right: var(--padding-horizontal-md);
  }
  @media screen and (min-width: 1024px) {
    padding-left: var(--padding-horizontal-lg);
    padding-right: var(--padding-horizontal-lg);
  }
  @media screen and (min-width: 1200px) {
    padding-top: 80px;
    padding-bottom: 60px;
  }
  @media screen and (min-width: 1440px) {
    padding-left: var(--padding-horizontal-xl);
    padding-right: var(--padding-horizontal-xl);
  }
}
.footer :deep(.logo.v-list-subheader) {
  font-size: 24px;
  font-weight: bold;
}
.footer :deep(.v-list-subheader) {
  color: var(--white-text);
  font-size: 20px;
}
.footer :deep(.v-list) {
  background-color: var(--black-background);
  color: var(--white-text);
  text-align: left;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  & a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: column;
  }
}

.footer :deep(div.v-col) {
  padding: 0;
  width: fit-content;
}
.footer :deep(div.v-row) {
  margin: 0;
  justify-content: space-between;
  flex-direction: row;
  gap: 30px;
}
.footer-copyright {
  background-color: transparent;
  color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  padding-top: 16px;
  padding-bottom: 24px;
  border-radius: 0;
}
.address {
  flex-direction: column;
}
.school-logo {
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: #f3d510;
  color: var(--black-text);
  font-size: 16px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.footer :deep(.school-link) {
  overflow-wrap: break-all;
  &:hover,
  :focus,
  :active {
    text-decoration: underline;
  }
}
</style>
