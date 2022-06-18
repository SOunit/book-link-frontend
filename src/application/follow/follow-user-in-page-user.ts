import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useFollowUserInPageUser = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const followUserInPageUser = (followingUser: User, followerUser: User) => {
    storage.addUserToFollowers(followingUser);
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return { followUserInPageUser };
};
