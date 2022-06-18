import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FollowStorageService } from '../application/ports';
import { User } from '../domain';
import {
  addUserToFollowersAction,
  addUserToFollowingsAction,
  initFollowersAction,
  initFollowingsAction,
  initFollowIsLoadedAction,
  removeUserFromFollowersAction,
  updateIsFollowingInFollowersAction,
  updateIsFollowingInFollowingsAction,
} from './store/re-ducks/follow/actions';
import { RootState } from './store/store';

export const useFollowStorage = () => {
  const dispatch = useDispatch();

  const followState = useSelector((state: RootState) => state.follow);

  const addUserToFollowers = (followingUser: User) => {
    dispatch(addUserToFollowersAction(followingUser));
  };

  const removeUserFromFollowers = (followingUser: User) => {
    dispatch(removeUserFromFollowersAction(followingUser));
  };

  const addUserToFollowings = (followerUser: User) => {
    dispatch(addUserToFollowingsAction(followerUser));
  };

  const updateIsFollowingInFollowings = (
    followerUser: User,
    toFollowing: boolean,
  ) => {
    dispatch(updateIsFollowingInFollowingsAction(followerUser, toFollowing));
  };

  const updateIsFollowingInFollowers = (
    userInFollowers: User,
    toFollowing: boolean,
  ) => {
    dispatch(updateIsFollowingInFollowersAction(userInFollowers, toFollowing));
  };

  const initFollowIsLoaded = useCallback(() => {
    dispatch(initFollowIsLoadedAction());
  }, [dispatch]);

  const initFollowings = (followings: User[]) => {
    dispatch(initFollowingsAction(followings));
  };

  const initFollowers = (followers: User[]) => {
    dispatch(initFollowersAction(followers));
  };

  return {
    ...followState,
    addUserToFollowers,
    removeUserFromFollowers,
    addUserToFollowings,
    updateIsFollowingInFollowers,
    updateIsFollowingInFollowings,
    initFollowIsLoaded,
    initFollowings,
    initFollowers,
  } as FollowStorageService;
};
