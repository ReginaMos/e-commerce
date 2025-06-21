<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const dialogVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

watch(dialogVisible, (val) => {
  if (val !== props.modelValue) {
    emit('update:modelValue', val);
  }
});

const handleConfirm = () => {
  emit('confirm');
  dialogVisible.value = false;
};

const handleCancel = () => {
  emit('cancel');
  dialogVisible.value = false;
};
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card
      prepend-icon="mdi-cart-outline"
      :title="title || 'Confirm Action'"
      :text="message || 'Are you sure you want to proceed?'"
    >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="handleCancel"> Cancel </v-btn>
        <v-btn color="error" variant="text" @click="handleConfirm"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
