import { useSearchStorage } from '../../services';

export const useClearSearchState = () => {
  const { clearSearchState } = useSearchStorage();

  return { clearSearchState };
};
