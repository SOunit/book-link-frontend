import { FC } from 'react';
import classes from './input.module.scss';

type Props = {
  onChange: any;
  initialValue?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

export const Input: FC<Props> = ({
  type = 'text',
  initialValue,
  placeholder,
  className,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={initialValue}
      onChange={onChange}
      className={`${classes['input']} ${className}`}
    />
  );
};
