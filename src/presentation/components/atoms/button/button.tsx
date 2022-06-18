import { FC } from 'react';
import classes from './button.module.scss';

type Props = {
  title: string;
  onClick?: any;
  className?: string;
  disabled?: boolean;
};

export const Button: FC<Props> = ({
  title,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={`${classes['button']} ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {title}
    </button>
  );
};
