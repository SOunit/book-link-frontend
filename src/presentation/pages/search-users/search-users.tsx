import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Button } from '../../components/atoms';
import {
  NotFoundMessage,
  RegisteredItems,
  SearchBar,
  SearchedItems,
  SearchedUsers,
  SectionTitle,
} from '../../components/molecules';
import { Item, User } from '../../../domain/';
import { useAuthStorage, useSearchStorage } from '../../../services';
import {
  useClearSearchState,
  useFollowUser,
  useRegisterItem,
  useSearchItems,
  useSearchUsers,
  useSetDefaultItems,
  useUnFollowUser,
  useUnRegisterItem,
  useUpdateIsItemSearched,
  useUpdateIsUserSearched,
} from '../../../application';
import classes from './search-users.module.scss';

export const SearchUsers = () => {
  // clean architecture
  const {
    isItemSearched,
    isUserSearched,
    searchedItems,
    registeredItems,
    searchedUsers,
  } = useSearchStorage();
  const { searchItems } = useSearchItems();
  const { registerItem } = useRegisterItem();
  const { unRegisterItem } = useUnRegisterItem();
  const { searchUsers } = useSearchUsers();
  const { updateIsItemSearched } = useUpdateIsItemSearched();
  const { setDefaultItems } = useSetDefaultItems();
  const { followUser } = useFollowUser();
  const { unFollowUser } = useUnFollowUser();
  const { updateIsUserSearched } = useUpdateIsUserSearched();
  const { clearSearchState } = useClearSearchState();

  // FIXME: to component
  const [searchItemInput, setSearchItemInput] = useState<string>('');
  // FIXME: to clean architecture
  const { loginUser, token } = useAuthStorage();

  const searchItemInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateIsItemSearched(false);
    setSearchItemInput(e.target.value);
  };

  const itemSearchHandler = () => {
    updateIsUserSearched(false);
    searchItems(searchItemInput);
  };

  const registerItemHandler = (item: Item) => {
    registerItem(item);
  };

  const unRegisterItemHandler = (itemId: string) => {
    unRegisterItem(itemId);
  };

  const userSearchHandler = async () => {
    updateIsUserSearched(true);
    searchUsers(token!);
  };

  const followClickHandler = (followerUser: User) => {
    if (loginUser) {
      followUser(loginUser, followerUser);
    }
  };

  const followingClickHandler = (followerUser: User) => {
    if (loginUser) {
      unFollowUser(loginUser, followerUser);
    }
  };

  useEffect(() => {
    clearSearchState();
    setDefaultItems();
  }, [clearSearchState, setDefaultItems]);

  useEffect(() => {
    updateIsUserSearched(false);
  }, [updateIsUserSearched, registeredItems]);

  let registeredItemsSection = null;
  if (registeredItems.length > 0) {
    registeredItemsSection = (
      <section>
        <SectionTitle>Registered items</SectionTitle>
        <RegisteredItems
          items={registeredItems}
          onDeleteRegisteredItem={unRegisterItemHandler}
        />
        <div className={classes['button-container']}>
          <Button title="Search Users" onClick={userSearchHandler} />
        </div>
      </section>
    );
  }

  let searchedUsersSection = null;
  if (searchedUsers && searchedUsers.length > 0 && loginUser) {
    searchedUsersSection = (
      <SearchedUsers
        users={searchedUsers}
        loginUser={loginUser}
        onFollowClick={followClickHandler}
        onFollowingClick={followingClickHandler}
      />
    );
  } else if (isUserSearched && searchedUsers && searchedUsers.length <= 0) {
    searchedUsersSection = (
      <NotFoundMessage
        title="No user found!"
        text="Please change items to search user."
      />
    );
  }

  return (
    <Fragment>
      <section className={classes['search-bar']}>
        <SearchBar
          value={searchItemInput}
          onChange={searchItemInputChangeHandler}
          placeholder={'Search item'}
          onSetIsSearched={() => updateIsItemSearched(true)}
          onSetSearchResult={itemSearchHandler}
        />
      </section>
      <section>
        <SearchedItems
          items={searchedItems}
          registeredItems={registeredItems}
          isItemSearched={isItemSearched}
          onAddClick={registerItemHandler}
        />
      </section>
      {registeredItemsSection}
      {searchedUsersSection}
    </Fragment>
  );
};
