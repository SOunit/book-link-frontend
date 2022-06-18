import { FC } from 'react';
import classes from './textarea.module.scss';

type Props = {
  onChange: any;
  value?: string;
  className?: string;
  placeholder?: string;
};

export const Textarea: FC<Props> = ({
  onChange,
  value,
  className,
  placeholder,
}) => {
  return (
    <textarea
      onChange={onChange}
      value={value}
      className={`${classes['textarea']} ${className}`}
      placeholder={placeholder}
    />
  );
};
