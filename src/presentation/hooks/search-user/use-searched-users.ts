import { useState } from 'react';
import { User } from '../../../domain/';

export const useSearchedUsers = () => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  const followClickHandler = (targetUserId: string) => {
    // update state
    const newFollowings = searchedUsers.map((user) => {
      if (user.id === targetUserId) {
        user.isFollowing = true;
      }
      return user;
    });

    setSearchedUsers(newFollowings);
  };

  const followingClickHandler = (targetUserId: string) => {
    // update state
    const newFollowings = searchedUsers.map((user) => {
      if (user.id === targetUserId) {
        user.isFollowing = false;
      }
      return user;
    });
    setSearchedUsers(newFollowings);
  };

  return {
    searchedUsers,
    setSearchedUsers,
    followClickHandler,
    followingClickHandler,
  };
};
