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

export type SearchState = {
  isItemSearched: boolean;
  isUserSearched: boolean;
  searchedItems: Item[];
  registeredItems: Item[];
  searchedUsers: User[];
};

interface SetSearchedItemsAction {
  type: typeof SET_SEARCHED_ITEMS;
  payload: { searchedItems: Item[] };
}

interface UpdateIsItemSearched {
  type: typeof UPDATE_IS_ITEM_SEARCHED;
  payload: { isItemSearched: boolean };
}

interface UpdateIsUserSearched {
  type: typeof UPDATE_IS_USER_SEARCHED;
  payload: { isUserSearched: boolean };
}

interface RegisterItemAction {
  type: typeof REGISTER_ITEM;
  payload: { item: Item };
}

interface UnRegisterItemAction {
  type: typeof UN_REGISTER_ITEM;
  payload: { itemId: string };
}

interface SetSearchedUsersAction {
  type: typeof SET_SEARCHED_USERS;
  payload: { users: User[] };
}

interface SetRegisteredItemsAction {
  type: typeof SET_REGISTERED_ITEMS;
  payload: { items: Item[] };
}

interface FollowUserAction {
  type: typeof FOLLOW_USER;
  payload: { followingUser: User; followerUser: User };
}

interface UnFollowUserAction {
  type: typeof UN_FOLLOW_USER;
  payload: { followingUser: User; followerUser: User };
}

interface ClearSearchStateAction {
  type: typeof CLEAR_SEARCH_STATE;
}

export type SearchActionTypes =
  | SetSearchedItemsAction
  | RegisterItemAction
  | UnRegisterItemAction
  | SetSearchedUsersAction
  | UpdateIsItemSearched
  | UpdateIsUserSearched
  | SetRegisteredItemsAction
  | FollowUserAction
  | UnFollowUserAction
  | ClearSearchStateAction;
