import { useSearchStorage, useUserAdapter } from '../../services';

export const useSearchUsers = () => {
  const userAdapter = useUserAdapter();
  const storage = useSearchStorage();

  const searchUsers = async (loginUserId: string) => {
    // fetch user data
    const itemIds = storage.registeredItems.map((item) => item.id);
    const response = await userAdapter.fetchUsersByItems(itemIds, loginUserId);
    const searchedUsers = response.data.data.getUsersByItems;

    // update state
    storage.setSearchedUsers(searchedUsers);
  };

  return { searchUsers };
};
