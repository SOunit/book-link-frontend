import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './follow-header.module.scss';

type Props = {
  userId: string;
};

export const FollowHeader: FC<Props> = ({ userId }) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/');

  return (
    <div className={classes['follow-header']}>
      <Link
        to={`/users/${userId}/followers`}
        className={`${classes['follow-header__title']} ${
          pathSegments.includes('followers') &&
          classes['follow-header__title--active']
        }`}>
        Followers
      </Link>
      <Link
        to={`/users/${userId}/followings`}
        className={`${classes['follow-header__title']} ${
          pathSegments.includes('followings') &&
          classes['follow-header__title--active']
        }`}>
        Followings
      </Link>
    </div>
  );
};
