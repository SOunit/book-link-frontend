import { FC } from 'react';
import classes from './follow-number.module.scss';

type Props = {
  followCount?: number;
  unitTitle: string;
  className?: string;
};

export const FollowNumber: FC<Props> = ({
  followCount,
  unitTitle,
  className,
}) => {
  return (
    <p className={`${classes['follow-number']} ${className}`}>
      <span className={classes['follow-number__number']}>{followCount}</span>{' '}
      {followCount || followCount === 0 ? unitTitle : ''}
    </p>
  );
};
