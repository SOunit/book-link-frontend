import { User } from '../../domain';
import { useFollowAdapter, useSearchStorage } from '../../services';
import { FollowAdapterService, SearchStorageService } from '../ports';

export const useFollowUser = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: SearchStorageService = useSearchStorage();

  const followUser = (followingUser: User, followerUser: User) => {
    storage.followUser(followingUser, followerUser);
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return { followUser };
};
