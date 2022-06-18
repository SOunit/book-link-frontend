import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../../../presentation/hooks';
import { User } from '../../../../domain/';
import { LogoutModal } from '../../organisms';
import { Backdrop } from '../backdrop/backdrop';
import { Image } from '../../atoms';
import classes from './user-info.module.scss';
import { FollowNumber } from '../follow-number/follow-number';
import { useAuthenticate } from '../../../../application';

type UserInfoProps = {
  user: User;
  isHome?: boolean;
  followingsCount: number;
  followersCount: number;
};

export const UserInfo: FC<UserInfoProps> = ({
  user,
  isHome = false,
  followingsCount,
  followersCount,
}) => {
  const { isModalOpen, modalOpenHandler, modalCloseHandler } = useModal();
  const { logout } = useAuthenticate();

  let aboutText = 'No comment yet!';
  if (user.about && user.about.length > 0) {
    aboutText = user.about;
  }

  const logoutClickHandler = () => {
    logout();
  };

  return (
    <Fragment>
      {isModalOpen && <Backdrop onSideMenuToggle={modalCloseHandler} />}
      {isModalOpen && (
        <LogoutModal
          onConfirm={logoutClickHandler}
          onCancel={modalCloseHandler}
          title="Logout"
          text="Do you logout?"
        />
      )}
      <div className={classes['user-info']}>
        <Image
          src={user.imageUrl}
          alt={user.name}
          className={`${classes['user-info__image']} ${
            !user.imageUrl && classes['user-info__image--no-image']
          }`}
          imageStyle={classes['user-info__image']}
        />
        <div className={classes['user-info__details']}>
          <p className={classes['user-info__name']}>{user.name}</p>
          <Link
            className={classes['user-info__link']}
            to={`/users/${user.id}/followings`}>
            <FollowNumber followCount={followingsCount} unitTitle="Following" />
          </Link>
          <Link
            className={classes['user-info__link']}
            to={`/users/${user.id}/followers`}>
            <FollowNumber followCount={followersCount} unitTitle="Followers" />
          </Link>
          {isHome && (
            <p
              className={classes['user-info__logout']}
              onClick={modalOpenHandler}>
              Logout
            </p>
          )}
        </div>
      </div>
      <p className={classes['user-about']}>{aboutText}</p>
    </Fragment>
  );
};
