import { FC } from 'react';
import { ItemCard } from '..';
import { Item } from '../../../../domain/';
import { IconButton } from '../../atoms';
import { Buttons } from '../buttons/buttons';
import classes from './registered-items.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type RegisteredItemsProps = {
  items: Item[];
  onDeleteRegisteredItem: any;
};

export const RegisteredItems: FC<RegisteredItemsProps> = (props) => {
  const createButtons = (item: Item) => {
    const buttons = (
      <Buttons>
        <IconButton
          icon={faTrash}
          onClick={() => props.onDeleteRegisteredItem(item.id)}
        />
      </Buttons>
    );

    return buttons;
  };

  const items = props.items.map((item) => {
    const buttons = createButtons(item);

    return (
      <ItemCard
        key={item.id}
        item={item}
        className={classes[`registered-item`]}
        actions={buttons}
      />
    );
  });

  return <div className={classes['registered-items']}>{items}</div>;
};
