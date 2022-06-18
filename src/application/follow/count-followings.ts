import { User } from '../../domain';

export const useCountFollowings = () => {
  const countFollowings = (followings?: User[]) => {
    if (!followings) {
      return;
    }

    let count = 0;
    followings.forEach((following) => {
      if (following.isFollowing) {
        count++;
      }
    });

    return count;
  };

  return {
    countFollowings,
  };
};
