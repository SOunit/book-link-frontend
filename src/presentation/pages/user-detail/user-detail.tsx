import { Fragment, useEffect, useState, FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Buttons,
  IconTextButton,
  Spinner,
  UserInfo,
  UserItems,
} from '../../components/molecules';
import { User } from '../../../domain/';
import {
  useChatAdapter,
  useAuthStorage,
  useFollowStorage,
  useUserAdapter,
} from '../../../services';
import {
  useAddUserToFollowers,
  useCreateChat,
  useInitFollow,
  useRemoveUserFromFollowers,
} from '../../../application';
import classes from './user-detail.module.css';
import {
  faUserMinus,
  faUserPlus,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

type UserDetailParams = {
  userId: string;
};

type Props = {};

export const UserDetail: FC<Props> = () => {
  const { loginUser } = useAuthStorage();
  const params = useParams<UserDetailParams>();
  const history = useHistory();
  const [targetUser, setTargetUser] = useState<User>();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const { addFollowerUserToFollowers } = useAddUserToFollowers();
  const { removeFollowerUserFromFollowers } = useRemoveUserFromFollowers();
  const { initIsLoaded, initFollow } = useInitFollow();
  const { followings, followers, isFollowersLoaded, isFollowingsLoaded } =
    useFollowStorage();
  const { fetchUser } = useUserAdapter();
  const chatAdapter = useChatAdapter();
  const { createChat } = useCreateChat();

  const followClickHandler = () => {
    if (loginUser && targetUser) {
      setIsFollowing(true);
      addFollowerUserToFollowers(targetUser, loginUser, targetUser);
    }
  };

  const followingClickHandler = () => {
    if (loginUser && targetUser) {
      setIsFollowing(false);
      removeFollowerUserFromFollowers(targetUser, loginUser, targetUser);
    }
  };

  const chatClickHandler = () => {
    if (!targetUser) {
      return;
    }

    // get message
    chatAdapter.fetchChat([targetUser.id, loginUser!.id]).then((res) => {
      const chats = res.data.data.getUserChat;

      if (chats && chats.length <= 0) {
        // create message if not exist
        history.push(`/chats/${targetUser.id}`);
      } else {
        if (loginUser && targetUser) {
          createChat(loginUser, targetUser).then((res) => {
            console.log(res);
            history.push(`/chats/${targetUser.id}`);
          });
        }
      }
    });
  };

  useEffect(() => {
    initIsLoaded();
  }, [initIsLoaded]);

  useEffect(() => {
    if (targetUser && loginUser) {
      initFollow(targetUser.id, loginUser.id);
    }
  }, [
    targetUser,
    loginUser,
    initFollow,
    isFollowersLoaded,
    isFollowingsLoaded,
  ]);

  useEffect(() => {
    const fetchTargetUser = () => {
      fetchUser(params.userId).then((result) => {
        setTargetUser(result.data.data.user);
      });
    };

    const setFollowingState = () => {
      if (loginUser) {
        const isFollowing = followers.some((user) => user.id === loginUser.id);
        setIsFollowing(isFollowing);
      }
    };

    fetchTargetUser();
    setFollowingState();
  }, [loginUser, followers, params.userId, fetchUser]);

  useEffect(() => {
    if (loginUser && loginUser.id === params.userId) {
      history.push('/home');
    }
  }, [loginUser, params.userId, history]);

  let userDetail = null;
  if (targetUser && loginUser) {
    userDetail = (
      <Fragment>
        {followings && followers ? (
          <UserInfo
            user={targetUser}
            isHome={false}
            followingsCount={followings.length}
            followersCount={followers.length}
          />
        ) : (
          <Spinner />
        )}
        <Buttons className={classes['user-detail__buttons']}>
          <IconTextButton
            icon={isFollowing ? faUserMinus : faUserPlus}
            text={isFollowing ? 'Following' : 'Follow'}
            onClick={isFollowing ? followingClickHandler : followClickHandler}
            className={classes['user-detail__button']}
          />
          <IconTextButton
            icon={faComment}
            text="Chat"
            onClick={chatClickHandler}
            className={classes['user-detail__button']}
          />
        </Buttons>
        {targetUser.Items && <UserItems items={targetUser.Items} />}
      </Fragment>
    );
  }

  return <Fragment>{userDetail}</Fragment>;
};
