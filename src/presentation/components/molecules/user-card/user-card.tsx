import { FC } from 'react';
import { User } from '../../../../domain/';
import { Image } from '../../atoms';
import { FollowNumber } from '../follow-number/follow-number';
import classes from './user-card.module.css';

type Props = {
  user: User;
  className?: string;
  actions?: any;
  imageClassName?: string;
  followingsCount?: number;
  followersCount?: number;
};

export const UserCard: FC<Props> = ({
  user,
  className,
  actions,
  imageClassName,
  followingsCount,
  followersCount,
}) => {
  return (
    <div className={`${classes['user-card']} ${className}`}>
      <Image
        src={user.imageUrl}
        alt={user.name}
        className={`${classes['user-image']} ${imageClassName}`}
        imageStyle={classes['user-image__image--round']}
      />
      <div className={classes['user-card__contents']}>
        <p className={classes['user-card__name']}>{user.name}</p>
        <FollowNumber
          followCount={followingsCount}
          unitTitle="Followings"
          className={classes['user-card__follow-number']}
        />

        <FollowNumber
          followCount={followersCount}
          unitTitle="Followers"
          className={classes['user-card__follow-number']}
        />
      </div>
      <div className={classes['actions']}>{actions}</div>
    </div>
  );
};
