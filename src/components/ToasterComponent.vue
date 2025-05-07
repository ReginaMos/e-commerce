<template>
  <v-snackbar v-model="isVisible" :timeout="timeout" :color="color" :elevation="elevation" :location="location">
    {{ message }}
    <template v-slot:actions>
      <v-btn color="primary" text @click="isVisible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Anchor } from 'vuetify';

defineProps({
  timeout: {
    type: Number,
    default: 5000,
  },
  elevation: {
    type: Number,
    default: 6,
  },
  location: {
    type: String as () => Anchor,
    default: 'top right',
  },
});

const isVisible = ref(false);
const message = ref('');
const color = ref('');

const showToaster = (newMessage: string, newColor: string = '') => {
  message.value = newMessage;
  color.value = newColor;
  isVisible.value = true;
};

defineExpose({
  showToaster,
});
</script>
