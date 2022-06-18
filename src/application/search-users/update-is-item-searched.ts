import { useSearchStorage } from '../../services';
import { SearchStorageService } from '../ports';

export const useUpdateIsItemSearched = () => {
  const storage: SearchStorageService = useSearchStorage();

  const updateIsItemSearched = (isItemSearched: boolean) => {
    storage.updateIsItemSearched(isItemSearched);
  };

  return { updateIsItemSearched };
};
