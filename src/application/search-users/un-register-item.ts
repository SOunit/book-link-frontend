import { useSearchStorage } from '../../services';
import { SearchStorageService } from '../ports';

export const useUnRegisterItem = () => {
  const storage: SearchStorageService = useSearchStorage();

  const unRegisterItem = (itemId: string) => {
    storage.unRegisterItem(itemId);
  };

  return { unRegisterItem };
};
