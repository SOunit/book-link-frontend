import { useCallback } from 'react';
import { User } from '../../domain';
import { useUserAdapter, useAuthStorage } from '../../services';

import { UserStorageService } from '../ports';

export const useUserUseCase = () => {
  const storage: UserStorageService = useAuthStorage();
  const userAdapter = useUserAdapter();

  const getLoginUser = (): User | null => {
    return storage.loginUser;
  };

  const getUser = useCallback(
    (userId: string) => {
      return userAdapter.fetchUser(userId);
    },
    [userAdapter],
  );

  const updateUser = (user: User): void => {
    userAdapter.updateUser({
      id: user.id,
      name: user.name,
      about: user.about ? user.about : '',
      imageUrl: user.imageUrl,
    });

    storage.updateLoginUser(user);
  };

  return { updateUser, getLoginUser, getUser };
};
