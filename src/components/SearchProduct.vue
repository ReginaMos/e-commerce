<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Links } from '../constants/routersLinks.ts';

const { mdAndUp } = useDisplay();
const searchQuery = ref('');

const router = useRouter();
const getSerchQuery = (query: string) => {
  if (query.trim()) {
    if (router)
      router.push({
        path: Links.SEARCH.LINK,
        query: {
          search: query,
        },
      });
  }
};
// function onChange() {
//   console.log('searchQuery: ', searchQuery);
// }
</script>

<template>
  <div class="input-wrapper" v-if="mdAndUp">
    <v-text-field
      v-model="searchQuery"
      type="text"
      variant="plain"
      clearable
      label="What are you looking for?"
      class="search-input"
      persistent-clear
      @keydown.enter="getSerchQuery(searchQuery)"
    />
    <v-btn class="search-btn" v-if="mdAndUp" @click="getSerchQuery(searchQuery)">
      <v-icon> mdi-magnify </v-icon>
    </v-btn>
  </div>
</template>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: black !important;
  caret-color: black;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
<style scoped lang="scss">
.input-wrapper {
  margin-right: 24px;
  width: 210px;
  max-width: 243px;
  height: 38px;
  display: flex;
  align-items: center;
  background-color: var(--gray-secondary);
  @media screen and (min-width: 1440px) {
    width: 243px;
  }
}
.search-input {
  height: 38px;
}
.search-input :deep(.v-field__input) {
  background-color: transparent;
  height: 38px;
  padding: 7px 12px 7px 20px;
}
.search-input :deep(.v-label) {
  color: var(--gray-text-color);
  font-size: 12px;
  padding-left: 20px;
}
.v-btn.search-btn {
  min-width: 38px;
  min-height: 38px;
  max-height: 38px;
  background-color: transparent;
  padding: 0;
  color: var(--black-text);
  &:hover {
    color: var(--white-text);
    background-color: var(--red-secondary);
    transition: background-color 0.28s ease-in-out;
  }
}
</style>
