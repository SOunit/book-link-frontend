import { useCallback } from 'react';
import {
  useItemAdapter,
  useSearchStorage,
  useAuthStorage,
} from '../../services';
import { SearchStorageService } from '../ports';

export const useSetDefaultItems = () => {
  const { loginUser } = useAuthStorage();
  const { fetchRandomItems } = useItemAdapter();
  const { setRegisteredItems }: SearchStorageService = useSearchStorage();

  const setDefaultItems = useCallback(async () => {
    if (!loginUser || !loginUser.Items) {
      return;
    }

    let defaultItems = loginUser.Items;

    if (defaultItems.length === 0) {
      const response = await fetchRandomItems();
      defaultItems = response.data.data.fetchRandomItems;
    }

    setRegisteredItems(defaultItems);
  }, [loginUser, fetchRandomItems, setRegisteredItems]);

  return {
    setDefaultItems,
  };
};
