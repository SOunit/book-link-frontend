import { FC, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  IconTextButton,
  Spinner,
  UserInfo,
  UserItems,
} from '../../components/molecules';
import classes from './home.module.css';
import { useInitFollow } from '../../../application';
import { useAuthStorage, useFollowStorage } from '../../../services';
import { faPen, faBook } from '@fortawesome/free-solid-svg-icons';

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { loginUser } = useAuthStorage();
  const history = useHistory();
  const { initFollow, initIsLoaded } = useInitFollow();
  const { followings, followers, isFollowersLoaded, isFollowingsLoaded } =
    useFollowStorage();

  useEffect(() => {
    initIsLoaded();
  }, [initIsLoaded]);

  useEffect(() => {
    if (loginUser) {
      initFollow(loginUser.id, loginUser.id);
    }
  }, [loginUser, initFollow, isFollowersLoaded, isFollowingsLoaded]);

  const editProfileClickHandler = () => {
    history.push(`/users/edit`);
  };

  const editUserItemsClickHandler = () => {
    history.push(`/users/items/edit`);
  };

  const component = (
    <Fragment>
      {loginUser && followers && followings ? (
        <UserInfo
          user={loginUser}
          isHome
          followersCount={followers.length}
          followingsCount={followings.length}
        />
      ) : (
        <Spinner />
      )}
      <div className={classes['home__actions']}>
        <IconTextButton
          icon={faPen}
          text="Edit Profile"
          onClick={editProfileClickHandler}
        />
        <IconTextButton
          icon={faBook}
          text="Edit Items"
          onClick={editUserItemsClickHandler}
        />
      </div>
      {loginUser && (
        <UserItems items={loginUser.Items ? loginUser.Items : []} />
      )}
    </Fragment>
  );

  return component;
};
