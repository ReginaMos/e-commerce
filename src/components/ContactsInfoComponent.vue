<script setup lang="ts">
import IconPhoneElement from '../elements/IconPhoneElement.vue';
import IconEmailElement from '../elements/IconEmailElement.vue';

</script>
<template>
    <v-sheet class="contacts-wrapper" elevation="4">
          <div class="wrapper">
            <div class="contact-link-wrapper mb-6">
              <a href="tel:+8801611112222" class="contact-link" 
                ><IconPhoneElement icon="basil:phone-outline" width="24" height="24" class="contact-icon"
              /><span>Call To Us</span></a>
              
            </div>
            <p class="mb-4">We are available 24/7, 7 days a week.</p>
            <p class="mb-8">+8801611112222</p>
          </div>
          <v-divider class="mb-8"></v-divider>
          <div class="wrapper">
            <div class="contact-link-wrapper mb-6">
                <a href="mailto:support_vue_magic_time@gmail.com" class="contact-link"
                ><IconEmailElement icon="pepicons-pencil:letter" width="24" height="24" class="contact-icon"
              /><span>Write To US</span></a>
              
            </div>
            <p class="mb-4">Fill out our form and we will contact you within 24 hours.</p>
            <p class="mb-4">vue_magic_time@gmail.com</p>
            <p>support_vue_magic_time@gmail.com</p>
          </div>
        </v-sheet>
</template>
<style scoped lang="scss">
  .contacts-wrapper {
  width: 100%;
  padding: 40px 35px;
  @media screen and (min-width: 1200px){
    width: fit-content;
    padding: 40px 35px;
    }
}
.contact-link-wrapper {
  margin-bottom: 24px;
  display: flex;  
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}
.contact-link-wrapper span {
  font-weight: 600;
}
.contact-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

}
.contact-link span {
    font-weight: 700;
    &:hover,
    &:focus,
    &:active {
        color: var(--red-secondary);
    }
}
.contact-link:hover .contact-icon {
  background-color: var(--white-text);
  border: 1px solid var(--red-secondary);
  color: var(--red-secondary)
}
.contact-icon {
  width: 40px;
  padding: 5px;
  height: 40px;
  color: var(--white-text);
  background-color: var(--red-secondary);
  border-radius: 50%;
}
.wrapper {
  text-align: left;
}
.wrapper p {
  width: 100%;
  white-space: wrap;
  word-break: break-all;
  @media screen and (min-width: 1200px){
    width: 271px;
  }   
}
</style>