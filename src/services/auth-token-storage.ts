import { AuthTokenStorageService } from '../application/ports';
import { useCallback } from 'react';

export const useAuthTokenStorage = (): AuthTokenStorageService => {
  const getItem = useCallback((key: string): string | null => {
    return localStorage.getItem(key);
  }, []);

  const setItem = useCallback((key: string, value: string): void => {
    localStorage.setItem(key, value);
  }, []);

  const removeItem = useCallback((key: string): void => {
    localStorage.removeItem(key);
  }, []);

  return { getItem, setItem, removeItem };
};
