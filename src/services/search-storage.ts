import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchStorageService } from '../application/ports';
import { RootState } from './store/store';
import { Item, User } from '../domain';
import {
  clearSearchStateAction,
  followUserAction,
  registerItemAction,
  SetRegisteredItemsAction,
  setSearchedItemsAction,
  setSearchedUsersAction,
  unFollowUserAction,
  unRegisterItemAction,
  updateIsItemSearchedAction,
  updateIsUserSearchedAction,
} from './store/re-ducks/search/actions';

export const useSearchStorage = () => {
  const searchUserState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const clearSearchState = useCallback(() => {
    dispatch(clearSearchStateAction());
  }, [dispatch]);

  const followUser = (followingUser: User, followerUser: User) => {
    dispatch(followUserAction(followingUser, followerUser));
  };

  const unFollowUser = (followingUser: User, followerUser: User) => {
    dispatch(unFollowUserAction(followingUser, followerUser));
  };

  const registerItem = (item: Item) => {
    dispatch(registerItemAction(item));
  };

  const unRegisterItem = (itemId: string) => {
    dispatch(unRegisterItemAction(itemId));
  };

  const setSearchedItems = (searchedItems: Item[]) => {
    dispatch(setSearchedItemsAction(searchedItems));
  };

  const setSearchedUsers = (searchedUsers: User[]) => {
    dispatch(setSearchedUsersAction(searchedUsers));
  };

  const setRegisteredItems = useCallback(
    (items: Item[]) => {
      dispatch(SetRegisteredItemsAction(items));
    },
    [dispatch],
  );

  const updateIsItemSearched = (isItemSearched: boolean) => {
    dispatch(updateIsItemSearchedAction(isItemSearched));
  };

  const updateIsUserSearched = useCallback(
    (isUserSearched: boolean) => {
      dispatch(updateIsUserSearchedAction(isUserSearched));
    },
    [dispatch],
  );

  return {
    ...searchUserState,
    clearSearchState,
    followUser,
    unFollowUser,
    registerItem,
    unRegisterItem,
    setSearchedItems,
    setSearchedUsers,
    setRegisteredItems,
    updateIsItemSearched,
    updateIsUserSearched,
  } as SearchStorageService;
};
