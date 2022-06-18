import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

// PAGE: user-detail
export const useAddUserToFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();

  const addFollowerUserToFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
  ) => {
    if (pageUser.id === followerUser.id) {
      storage.addUserToFollowers(followingUser);
    }
    const toFollowing = true;
    storage.updateIsFollowingInFollowers(followingUser, toFollowing);

    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return {
    addFollowerUserToFollowers,
  };
};
