import { Item, User } from '../../../../domain';
import {
  CLEAR_SEARCH_STATE,
  FOLLOW_USER,
  REGISTER_ITEM,
  SET_REGISTERED_ITEMS,
  SET_SEARCHED_ITEMS,
  SET_SEARCHED_USERS,
  UN_FOLLOW_USER,
  UN_REGISTER_ITEM,
  UPDATE_IS_ITEM_SEARCHED,
  UPDATE_IS_USER_SEARCHED,
} from './constants';
import { SearchActionTypes } from './types';

export const setSearchedItemsAction = (
  searchedItems: Item[],
): SearchActionTypes => {
  return { type: SET_SEARCHED_ITEMS, payload: { searchedItems } };
};

export const updateIsItemSearchedAction = (isItemSearched: boolean) => {
  return { type: UPDATE_IS_ITEM_SEARCHED, payload: { isItemSearched } };
};

export const updateIsUserSearchedAction = (isUserSearched: boolean) => {
  return { type: UPDATE_IS_USER_SEARCHED, payload: { isUserSearched } };
};

export const registerItemAction = (item: Item): SearchActionTypes => {
  return { type: REGISTER_ITEM, payload: { item } };
};

export const unRegisterItemAction = (itemId: string): SearchActionTypes => {
  return { type: UN_REGISTER_ITEM, payload: { itemId } };
};

export const SetRegisteredItemsAction = (items: Item[]): SearchActionTypes => {
  return { type: SET_REGISTERED_ITEMS, payload: { items } };
};

export const setSearchedUsersAction = (users: User[]): SearchActionTypes => {
  return { type: SET_SEARCHED_USERS, payload: { users } };
};

export const followUserAction = (
  followingUser: User,
  followerUser: User,
): SearchActionTypes => {
  return { type: FOLLOW_USER, payload: { followingUser, followerUser } };
};

export const unFollowUserAction = (
  followingUser: User,
  followerUser: User,
): SearchActionTypes => {
  return { type: UN_FOLLOW_USER, payload: { followingUser, followerUser } };
};

export const clearSearchStateAction = (): SearchActionTypes => {
  return { type: CLEAR_SEARCH_STATE };
};
