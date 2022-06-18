import { useSearchStorage } from '../../services';
import { SearchStorageService } from '../ports';

export const useUpdateIsUserSearched = () => {
  const { updateIsUserSearched }: SearchStorageService = useSearchStorage();

  return { updateIsUserSearched };
};
