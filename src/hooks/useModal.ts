import { useState } from 'react';

interface UseModalReturn {
  isModalOpen: boolean;
  toggleModal: () => void;
}
const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return {
    isModalOpen,
    toggleModal,
  };
};
export default useModal;
