<script setup lang="ts">
import ContactsFormComponent from '../components/ContactsFormComponent.vue';
import ContactsInfoComponent from '../components/ContactsInfoComponent.vue';
</script>
<template>
  <v-container>
    <v-row class="row-wrapper">
      <v-col class="contacts-col">
        <ContactsInfoComponent />
      </v-col>
      <v-col>
        <ContactsFormComponent />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.contacts-col {
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    width: 340px;
    max-width: 340px;
  }
}
.row-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
}
</style>
