import { useState } from 'react';

// FIXME
// make this type dynamic
type EditUserFormInput = {
  name: { value: string; isValid: boolean };
  about?: { value: string; isValid: boolean };
  isValid: boolean;
};

export const useValidateForm = () => {
  // FIXME
  // make this type dynamic
  const [formInputs, setFormInputs] = useState<EditUserFormInput>();

  const updateFormInputs = (id: string, value: string, isValid: boolean) => {
    if (!formInputs) {
      return;
    }

    let formIsValid = true;

    for (let [key, inputsValue] of Object.entries(formInputs)) {
      if (typeof inputsValue === 'object') {
        if (key === id) {
          // use latest validate state if target id matches
          formIsValid = formIsValid && isValid;
        } else {
          formIsValid = formIsValid && inputsValue.isValid;
        }
      }
    }

    setFormInputs((prevState) => ({
      ...prevState!,
      [id]: {
        value,
        isValid,
      },
      isValid: formIsValid,
    }));
  };

  return {
    formInputs,
    updateFormInputs,
    setFormInputs,
  };
};
