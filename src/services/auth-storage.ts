import { UserStorageService } from '../application/ports';
import { useAuthContext } from './store';

export const useAuthStorage = (): UserStorageService => {
  return useAuthContext() as UserStorageService;
};
