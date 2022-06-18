import { useItemAdapter, useSearchStorage } from '../../services';
import { SearchStorageService } from '../ports';

export const useSearchItems = () => {
  const itemAdapter = useItemAdapter();
  const storage: SearchStorageService = useSearchStorage();

  const searchItems = async (searchTerm: string) => {
    if (!searchTerm) {
      storage.setSearchedItems([]);
      return;
    }

    const response = await itemAdapter.fetchItemsByTitle(searchTerm);
    const searchedItems = response.data.data.itemsByTitle;

    storage.setSearchedItems(searchedItems);
  };

  return { searchItems };
};
