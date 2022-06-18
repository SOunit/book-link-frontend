import { Action } from 'redux';
import { User } from '../../../../domain';
import {
  ADD_USER_TO_FOLLOWERS,
  ADD_USER_TO_FOLLOWINGS,
  INIT_FOLLOWERS,
  INIT_FOLLOWINGS,
  INIT_FOLLOW_IS_LOADED,
  REMOVE_USER_FROM_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
} from './constants';

export type FollowState = {
  followings: User[];
  followers: User[];
  isFollowingsLoaded: boolean;
  isFollowersLoaded: boolean;
};

interface InitFollowingsAction extends Action {
  type: typeof INIT_FOLLOWINGS;
  payload: any[];
}

interface InitFollowersAction extends Action {
  type: typeof INIT_FOLLOWERS;
  payload: any[];
}

interface AddUserToFollowingsAction extends Action {
  type: typeof ADD_USER_TO_FOLLOWINGS;
  payload: User;
}

interface AddUserToFollowersAction extends Action {
  type: typeof ADD_USER_TO_FOLLOWERS;
  payload: User;
}

interface UpdateIsFollowingInFollowers extends Action {
  type: typeof UPDATE_IS_FOLLOWING_IN_FOLLOWERS;
  payload: {
    userInFollowers: User;
    toFollowing: boolean;
  };
}

interface UpdateIsFollowingInFollowings extends Action {
  type: typeof UPDATE_IS_FOLLOWING_IN_FOLLOWINGS;
  payload: {
    userInFollowings: User;
    toFollowing: boolean;
  };
}

interface RemoveUserFromFollowers extends Action {
  type: typeof REMOVE_USER_FROM_FOLLOWERS;
  payload: string;
}

interface InitFollowIsLoaded extends Action {
  type: typeof INIT_FOLLOW_IS_LOADED;
}

export type FollowActionTypes =
  | InitFollowIsLoaded
  | InitFollowingsAction
  | InitFollowersAction
  | AddUserToFollowingsAction
  | AddUserToFollowersAction
  | UpdateIsFollowingInFollowers
  | UpdateIsFollowingInFollowings
  | RemoveUserFromFollowers;
