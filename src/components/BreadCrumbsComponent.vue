<script setup lang="ts"></script>
<template>
  <v-breadcrumbs class="breadcrumbs">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
<style scoped lang="scss">
.breadcrumbs {
  position: absolute;
  top: 150px;
  left: 0;
  z-index: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: block;
  text-align: left;
  padding-left: var(--padding-horizontal-sm);
  padding-right: var(--padding-horizontal-sm);
  @media screen and (min-width: 376.98px) {
    padding-left: var(--padding-horizontal-md);
    padding-right: var(--padding-horizontal-md);
  }
  @media screen and (min-width: 1024px) {
    padding-left: var(--padding-horizontal-lg);
    padding-right: var(--padding-horizontal-lg);
    top: 110px;
  }

  @media screen and (min-width: 1200px) {
    padding-top: 202px;
    top: -45px;
  }
  @media screen and (min-width: 1440px) {
    padding-left: var(--padding-horizontal-xl);
    padding-right: var(--padding-horizontal-xl);
  }
}
</style>
