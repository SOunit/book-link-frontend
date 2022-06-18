import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

// PAGE: user-detail
export const useRemoveUserFromFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const removeFollowerUserFromFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
  ) => {
    if (followingUser.id) {
      // update state
      if (pageUser.id === followerUser.id) {
        storage.removeUserFromFollowers(followingUser);
      }
      const toFollowing = false;
      storage.updateIsFollowingInFollowers(followerUser, toFollowing);

      // update db
      followAdapter.deleteFollowing(followingUser.id, followerUser.id);
    }
  };

  return {
    removeFollowerUserFromFollowers,
  };
};
