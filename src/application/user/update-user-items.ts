import { User } from '../../domain';
import { useItemAdapter, useAuthStorage } from '../../services';

export const useUpdateUserItems = () => {
  const itemAdapter = useItemAdapter();
  const storage = useAuthStorage();

  const addUserItem = (user: User, itemId: string) => {
    itemAdapter.addUserItem(user.id, itemId);
    storage.updateLoginUser(user);
  };

  const removeUserItem = (user: User, itemId: string) => {
    itemAdapter.deleteUserItem(user.id, itemId);
    storage.updateLoginUser(user);
  };

  return { addUserItem, removeUserItem };
};
