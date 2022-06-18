import { ChangeEvent, FC, useState } from 'react';
import { validate, VALIDATOR_REQUIRE } from '../../../util';
import { ErrorText, Input } from '../../atoms';
import classes from './validate-input.module.scss';

type Props = {
  onChange: any;
  initialValue?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errorMessage: string;
};

export const ValidateInput: FC<Props> = ({
  onChange,
  initialValue,
  type,
  placeholder,
  className,
  errorMessage,
}) => {
  const [inputState, setInputState] = useState({
    value: initialValue || '',
    isValid: true,
  });

  const { value, isValid } = inputState;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // update parent state
    onChange(event);

    // update component state
    setInputState((prevState) => ({
      ...prevState,
      value: event.target.value,
      isValid: validate(event.target.value, [VALIDATOR_REQUIRE()]),
    }));
  };

  return (
    <div className={`${className}`}>
      <Input
        placeholder={placeholder}
        type={type}
        initialValue={value}
        onChange={inputChangeHandler}
        className={`${classes['validate-input__input']} ${
          !isValid && classes['validate-input__input--invalid']
        }`}
      />
      {!isValid && <ErrorText errorMessage={errorMessage} />}
    </div>
  );
};
