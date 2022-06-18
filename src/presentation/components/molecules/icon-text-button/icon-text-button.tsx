import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import classes from './icon-text-button.module.scss';

type Props = {
  icon: any;
  text: string;
  className?: string;
  onClick: any;
};

export const IconTextButton: FC<Props> = ({
  icon,
  text,
  className,
  onClick,
}) => {
  return (
    <button
      className={`${classes['icon-text-button']} ${className}`}
      onClick={onClick}>
      <FontAwesomeIcon
        className={classes['icon-text-button__icon']}
        icon={icon}
      />
      <p className={`${classes['icon-text-button__text']}`}>{text}</p>
    </button>
  );
};
