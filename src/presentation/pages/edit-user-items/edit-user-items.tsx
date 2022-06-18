import { ChangeEvent, FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../../domain/';
import {
  NotFoundMessage,
  RegisteredItems,
  SearchBar,
  SearchedItems,
  SectionTitle,
} from '../../components/molecules';
import { useSearchedItems } from '../../hooks';
import classes from './edit-user-items.module.scss';
import { useUpdateUserItems } from '../../../application/user/update-user-items';
import { User } from '../../../domain';
import { useAuthStorage } from '../../../services';

export const EditUserItems: FC = () => {
  const { loginUser } = useAuthStorage();
  const {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  } = useSearchedItems();
  const [itemSearchInput, setItemSearchInput] = useState('');
  const changeItemSearchInputHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setItemSearchInput(event.target.value);
  };
  const { addUserItem, removeUserItem } = useUpdateUserItems();

  const addClickHandler = (item: Item) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      if (!newUser.Items) {
        return;
      }
      newUser.Items.push(item);

      addUserItem(newUser, item.id);
    }
  };

  const deleteClickHandler = (itemId: string) => {
    if (loginUser) {
      // update user state
      const newUser: User = { ...loginUser };
      newUser.Items = newUser.Items!.filter((item) => item.id !== itemId);

      removeUserItem(newUser, itemId);
    }
  };

  return (
    <Fragment>
      <SectionTitle>Your items</SectionTitle>
      {loginUser && loginUser.Items && loginUser.Items.length > 0 ? (
        <RegisteredItems
          items={loginUser.Items}
          onDeleteRegisteredItem={deleteClickHandler}
        />
      ) : (
        <NotFoundMessage title="No Item Found" text="Please register items" />
      )}
      <section className={classes['search-bar']}>
        <SectionTitle>Add new items</SectionTitle>
        <SearchBar
          value={itemSearchInput}
          onChange={changeItemSearchInputHandler}
          placeholder={'Search item'}
          onSetIsSearched={updateIsItemSearchedHandler}
          onSetSearchResult={updateSearchedItemsHandler}
        />
        <Link to="/items/new" className={classes['new-item-link']}>
          Create New Item
        </Link>
      </section>
      {loginUser && (
        <section>
          <SearchedItems
            items={searchedItems}
            registeredItems={loginUser.Items ? loginUser.Items : []}
            isItemSearched={isItemSearched}
            onAddClick={addClickHandler}
          />
        </section>
      )}
    </Fragment>
  );
};
