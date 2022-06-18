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
import { SearchActionTypes, SearchState } from './types';

const initialState: SearchState = {
  isItemSearched: false,
  isUserSearched: false,
  searchedItems: [],
  registeredItems: [],
  searchedUsers: [],
};

export const searchReducer = (
  state = initialState,
  action: SearchActionTypes,
) => {
  switch (action.type) {
    case UPDATE_IS_ITEM_SEARCHED: {
      const { isItemSearched } = action.payload;
      return { ...state, isItemSearched };
    }

    case UPDATE_IS_USER_SEARCHED: {
      const { isUserSearched } = action.payload;
      return { ...state, isUserSearched };
    }

    case SET_SEARCHED_ITEMS: {
      const { searchedItems } = action.payload;
      return { ...state, searchedItems };
    }

    case REGISTER_ITEM: {
      const { item } = action.payload;
      const newRegisteredItems = [...state.registeredItems, item];
      return { ...state, registeredItems: newRegisteredItems };
    }

    case UN_REGISTER_ITEM: {
      const { itemId } = action.payload;
      const newRegisteredItems = state.registeredItems.filter(
        (item) => item.id !== itemId,
      );
      return { ...state, registeredItems: newRegisteredItems };
    }

    case SET_REGISTERED_ITEMS: {
      const { items } = action.payload;
      return { ...state, registeredItems: items };
    }

    case SET_SEARCHED_USERS: {
      const { users: searchedUsers } = action.payload;
      return { ...state, searchedUsers };
    }

    case FOLLOW_USER: {
      const { followerUser } = action.payload;

      const newSearchedUsers = state.searchedUsers.map((user) => {
        if (user.id === followerUser.id) {
          user.isFollowing = true;
        }
        return user;
      });

      return { ...state, searchedUsers: newSearchedUsers };
    }

    case UN_FOLLOW_USER: {
      const { followerUser } = action.payload;

      const newSearchedUsers = state.searchedUsers.map((user) => {
        if (user.id === followerUser.id) {
          user.isFollowing = false;
        }
        return user;
      });

      return { ...state, searchedUsers: newSearchedUsers };
    }

    case CLEAR_SEARCH_STATE: {
      return initialState;
    }

    default:
      return state;
  }
};
