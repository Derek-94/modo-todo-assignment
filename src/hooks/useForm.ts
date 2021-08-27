import React, { useState } from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface useFormReturn<T> {
  formData: T;
  onFormChange: (e: React.FormEvent<InputElement>) => void;
  formReducer: (obj: Partial<T>) => void;
}

const useForm = <T>(initialValue: T): useFormReturn<T> => {
  const [formData, setformData] = useState<T>(initialValue);

  const onFormChange = (e: React.FormEvent<InputElement>) => {
    const { name, value } = e.currentTarget;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const formReducer = (obj: Partial<T>) => {
    setformData({
      ...formData,
      ...obj,
    });
  };

  return { formData, onFormChange, formReducer };
};

export default useForm;
