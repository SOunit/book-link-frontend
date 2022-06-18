import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, MouseEventHandler } from 'react';
import classes from './icon-button.module.scss';

type Props = {
  icon: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export const IconButton: FC<Props> = ({ icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      title="icon-button"
      className={`${classes['icon-button']} ${className && className}`}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
