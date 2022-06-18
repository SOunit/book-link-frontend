import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useUnFollowUserInFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const unFollowUserInFollowers = (followingUser: User, followerUser: User) => {
    storage.updateIsFollowingInFollowers(followerUser, false);
    storage.updateIsFollowingInFollowings(followerUser, false);
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return {
    unFollowUserInFollowers,
  };
};
