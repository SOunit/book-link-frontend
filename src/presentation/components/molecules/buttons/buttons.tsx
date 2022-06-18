import { FC } from 'react';
import classes from './buttons.module.css';

type Props = {
  children: any;
  className?: string;
};

export const Buttons: FC<Props> = ({ className, children }) => {
  return (
    <div className={`${classes['button-container']} ${className}`}>
      {children}
    </div>
  );
};
