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
import { FollowState, FollowActionTypes } from './types';

// reducer
const initialState: FollowState = {
  followings: [],
  followers: [],
  isFollowersLoaded: false,
  isFollowingsLoaded: false,
};

export const followReducer = (
  state = initialState,
  action: FollowActionTypes,
): FollowState => {
  switch (action.type) {
    case INIT_FOLLOW_IS_LOADED: {
      return { ...state, isFollowersLoaded: false, isFollowingsLoaded: false };
    }

    case INIT_FOLLOWERS: {
      return { ...state, followers: action.payload, isFollowersLoaded: true };
    }

    case INIT_FOLLOWINGS: {
      return { ...state, followings: action.payload, isFollowingsLoaded: true };
    }

    case ADD_USER_TO_FOLLOWINGS: {
      console.log(ADD_USER_TO_FOLLOWINGS);

      console.log('followings', state.followings);

      const newUser = action.payload;

      console.log('newUser', newUser);

      const exists = state.followings.find((user) => user.id === newUser.id);

      if (exists) {
        return state;
      }

      const newFollowings = [...state.followings, newUser];

      console.log('newFollowings', newFollowings);

      return { ...state, followings: newFollowings };
    }

    case ADD_USER_TO_FOLLOWERS: {
      console.log(ADD_USER_TO_FOLLOWERS);
      console.log('followers', state.followers);

      const newFollower = action.payload;

      const exists = state.followers.find(
        (follower) => follower.id === newFollower.id,
      );

      if (exists) {
        return state;
      }

      const newFollowers = [...state.followers, newFollower];
      console.log('newFollowers', newFollowers);

      return { ...state, followers: newFollowers };
    }

    case UPDATE_IS_FOLLOWING_IN_FOLLOWERS: {
      const { userInFollowers, toFollowing } = action.payload;

      const newFollowers = state.followers.map((user) => {
        if (user.id === userInFollowers.id) {
          user.isFollowing = toFollowing;
        }
        return user;
      });

      return { ...state, followers: newFollowers };
    }

    case UPDATE_IS_FOLLOWING_IN_FOLLOWINGS: {
      const { userInFollowings, toFollowing } = action.payload;

      const newFollowings = state.followings.map((user) => {
        if (user.id === userInFollowings.id) {
          user.isFollowing = toFollowing;
        }
        return user;
      });

      return { ...state, followings: newFollowings };
    }

    case REMOVE_USER_FROM_FOLLOWERS: {
      const followingUserId = action.payload;

      const newFollowers = state.followers.filter(
        (follower) => follower.id !== followingUserId,
      );

      return { ...state, followers: newFollowers };
    }

    default: {
      return state;
    }
  }
};
