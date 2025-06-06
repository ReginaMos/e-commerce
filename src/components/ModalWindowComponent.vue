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
  <v-dialog class="dialog-slider" v-model="dialog" max-width="70vh">
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot name="activator" />
      </div>
    </template>
    <v-card class="card-dialog">
      <v-card-actions class="modal-card-action">
        <v-btn @click="dialog = false" class="close-modal" :ripple="false"><v-icon size="30">mdi-close</v-icon></v-btn>
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
.card-dialog {
  position: relative;
  background-color: var(--white-background);
}
.dialog-slider :deep(.v-carousel__controls) {
  display: none;
}
.current-slide-index {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.modal-card-action {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1000;
  min-width: 30px;
  min-height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-modal {
  padding: 0;
  min-width: 30px;
  min-height: 30px;
  &:hover,
  &:focus,
  &:active {
    background-color: transparent !important;
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
