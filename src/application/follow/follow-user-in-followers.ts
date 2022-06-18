import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useFollowUserInFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const followStorage: FollowStorageService = useFollowStorage();

  const followUserInFollowers = (
    followingUser: User,
    followerUser: User,
    pageUser: User,
    loginUser: User,
  ) => {
    // update state
    if (pageUser.id === loginUser.id) {
      // add follower user to followings of loginUser
      followStorage.addUserToFollowings(followerUser);
    }
    followStorage.updateIsFollowingInFollowers(followerUser, true);
    followStorage.updateIsFollowingInFollowings(followerUser, true);

    // update db
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return {
    followUserInFollowers,
  };
};
