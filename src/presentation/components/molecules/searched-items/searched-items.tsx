import { Fragment } from 'react';
import { Buttons, NotFoundMessage, SearchItemCard } from '..';
import { Item } from '../../../../domain/';
import { IconButton } from '../../atoms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type SearchedItemsProps = {
  items: Item[];
  registeredItems: Item[];
  isItemSearched: boolean;
  onAddClick: (item: Item) => void;
};

export const SearchedItems: React.FC<SearchedItemsProps> = ({
  items,
  registeredItems,
  isItemSearched,
  onAddClick,
}) => {
  const createButtons = (item: Item) => {
    const buttonDisabled = registeredItems.some((elem) => elem.id === item.id);

    const buttons = (
      <Buttons>
        {!buttonDisabled && (
          <IconButton icon={faPlus} onClick={() => onAddClick(item)} />
        )}
      </Buttons>
    );

    return buttons;
  };

  let searchItemCardList = items.map((item) => {
    const buttons = createButtons(item);
    return <SearchItemCard key={item.id} item={item} actions={buttons} />;
  });

  return (
    <Fragment>
      {searchItemCardList.length === 0 && isItemSearched && (
        <NotFoundMessage
          title="Item not found!"
          text="Please search by another keyword."
        />
      )}
      {searchItemCardList &&
        searchItemCardList.length !== 0 &&
        searchItemCardList}
    </Fragment>
  );
};
