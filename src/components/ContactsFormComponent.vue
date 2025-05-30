<script setup lang="ts"></script>
<template>
  <v-sheet elevation="4" class="form-sheet">
    <v-form class="contacts-form">
      <div class="input-wrapper">
        <v-text-field label="Your Name"></v-text-field>
        <v-text-field label="Your Email"></v-text-field>
        <v-text-field label="Your Phone"></v-text-field>
      </div>

      <v-textarea label="Your Message" rows="7"></v-textarea>
      <v-btn>Send Message</v-btn>
    </v-form>
  </v-sheet>
</template>
<style scoped lang="scss">
.contacts-form {
  padding: 40px 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  @media screen and (min-width: 1200px) {
    height: 465px;
  }
}
.form-sheet {
  width: 100%;
  @media screen and (min-width: 1200px) {
    max-width: 800px;
  }
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
}
.contacts-form :deep(.v-btn) {
  align-self: flex-end;
  background-color: var(--red-secondary);
  color: var(--white-text);
  padding: 16px 49px;
  font-weight: 500;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 56px;
}
</style>
