<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  images: { url: string }[];
  altText?: string;
}>();
const dialog = ref(false);
defineExpose({ dialog });
</script>
<template>
    <v-dialog class="dialog-slider" v-model="dialog">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot name="activator"/>
            </div>
            
          </template>
          <v-card class="card-dialog">
            <v-card-actions class="modal-card-action">
              <v-btn @click="dialog = false" :ripple="false" class="close-modal"><v-icon size="30">mdi-close</v-icon></v-btn>
            </v-card-actions>
            <v-carousel class="modal-slider" height="null">
              <v-carousel-item
                height="null"
                v-for="(image, index) in images"
                :key="image.url"
                :value="image.url"
                :items-to-show="1"
              >
                <v-sheet>
                  <v-card>
                    <v-row>
                      <v-col>
                        <v-img :src="image.url" :alt="altText" class="modal-slider-image"></v-img>
                        <span class="current-slide-index">{{ index + 1 }}/{{ images.length }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          
          </v-card>
        </v-dialog>
</template>
<style scoped lang="scss">
.dialog-slider {
 width: 100%;
 max-width: 840px;
 height: auto;
}
.modal-slider-image :deep(.v-img__img) {
  height: auto!important;
  max-width: 780px;
}
.card-dialog {
  position: relative;
  background-color: var(--white-background);
  padding: 30px;
  height: auto!important;
}

.dialog-slider :deep(.v-carousel__controls) {
  display: none;
}

.current-slide-index {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
.modal-card-action {
  position: absolute;
  right: 0;
  top:0;
  z-index: 1000;
  width: 40px!important;
  height: 40px;
  padding: 0;
  align-items: flex-start;
}

.close-modal {
  padding: 0;
  min-width: 30px;
  min-height: 30px;
  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    color: var(--red-secondary);

  }
}
.modal-slider :deep(.v-btn) {
  background-color: transparent;
  &:hover,
  &:focus,
  &:active {
    background: var(--white-background);
  }
}
.modal-slider :deep(.v-btn--variant-elevated) {
  box-shadow: none;
}
</style>