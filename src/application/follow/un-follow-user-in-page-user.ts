import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

// PAGE: follow
export const useUnFollowUserInPageUser = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const unFollowUserInPageUser = (followingUser: User, followerUser: User) => {
    storage.removeUserFromFollowers(followingUser);
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return { unFollowUserInPageUser };
};
