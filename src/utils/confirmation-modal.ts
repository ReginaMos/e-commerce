import { ref } from 'vue';

export function useConfirmationModal() {
  const isModalOpen = ref(false);
  const modalTitle = ref('Confirm Action');
  const modalMessage = ref('Are you sure you want to proceed?');

  const showModal = (title?: string, message?: string) => {
    if (title) modalTitle.value = title;
    if (message) modalMessage.value = message;
    isModalOpen.value = true;
  };

  const hideModal = () => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen,
    modalTitle,
    modalMessage,
    showModal,
    hideModal,
  };
}
