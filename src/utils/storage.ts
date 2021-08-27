import { Itodo } from 'types';

type StorageValue = Itodo[] | null;

export const setStorage = (key: string, value: StorageValue): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: string): StorageValue => {
  const data = JSON.parse(window.localStorage.getItem(key) || '[]');

  return data.length ? data : null;
};
