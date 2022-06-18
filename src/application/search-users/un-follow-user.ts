import { User } from '../../domain';
import { useFollowAdapter, useSearchStorage } from '../../services';
import { SearchStorageService } from '../ports';

export const useUnFollowUser = () => {
  const followAdapter = useFollowAdapter();
  const storage: SearchStorageService = useSearchStorage();

  const unFollowUser = (followingUser: User, followerUser: User) => {
    // update state
    storage.unFollowUser(followingUser, followerUser);

    // update db
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return { unFollowUser };
};
