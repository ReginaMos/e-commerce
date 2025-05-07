<template>
  <v-snackbar v-model="isVisible" :timeout="timeout" :color="color" multi-line location="top right">
    {{ message }}
    <template v-slot:actions>
      <v-btn color="primary" text @click="isVisible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
const color = ref('');
const timeout = ref(0);

const showToaster = (newMessage: string, newColor: string = '', newTimeout = 5) => {
  message.value = newMessage;
  color.value = newColor;
  isVisible.value = true;
  timeout.value = newTimeout * 1000;
};

defineExpose({
  showToaster,
});
</script>
