import { useSearchStorage } from '../../services';
import { SearchStorageService } from '../ports';

export const useRegisterItem = () => {
  const storage: SearchStorageService = useSearchStorage();

  const { registerItem } = storage;

  return { registerItem };
};
