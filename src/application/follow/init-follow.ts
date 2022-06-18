import { useCallback } from 'react';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useInitFollow = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const {
    isFollowingsLoaded,
    isFollowersLoaded,
    initFollowIsLoaded,
    initFollowings,
    initFollowers,
  } = storage;
  const { fetchFollowingUsers, fetchFollowerUsers } = followAdapter;

  const initIsLoaded = useCallback(() => {
    initFollowIsLoaded();
  }, [initFollowIsLoaded]);

  const initFollow = useCallback(
    (targetUserId: string, loginUserId: string) => {
      if (!isFollowingsLoaded) {
        fetchFollowingUsers(targetUserId, loginUserId).then((res) => {
          const followings = res.data.data.getFollowingUsers;
          initFollowings(followings);
        });
      }

      if (!isFollowersLoaded) {
        fetchFollowerUsers(targetUserId, loginUserId).then((res) => {
          const followers = res.data.data.getFollowerUsers;
          initFollowers(followers);
        });
      }
    },
    [
      fetchFollowingUsers,
      fetchFollowerUsers,
      isFollowingsLoaded,
      isFollowersLoaded,
      initFollowings,
      initFollowers,
    ],
  );
  return { initFollow, initIsLoaded };
};
