import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useFollowUserInFollowings = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const followUserInFollowings = (followingUser: User, followerUser: User) => {
    storage.updateIsFollowingInFollowings(followerUser, true);
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return {
    followUserInFollowings,
  };
};
