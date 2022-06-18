import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useUnFollowUserInFollowings = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const unFollowUserInFollowings = (
    followingUser: User,
    followerUser: User,
  ) => {
    storage.updateIsFollowingInFollowings(followerUser, false);
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return {
    unFollowUserInFollowings,
  };
};
