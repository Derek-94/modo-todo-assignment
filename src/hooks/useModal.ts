import { useState } from 'react';

type UseModalReturn = [boolean, () => void];
const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return [isModalOpen, toggleModal];
};
export default useModal;
