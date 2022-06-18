import { FC } from 'react';
import { Item } from '../../../../domain/';
import { Image } from '../../atoms';
import classes from './item-card.module.css';

type Props = {
  item: Item;
  className: string;
  actions: any;
};

export const ItemCard: FC<Props> = ({ item, className, actions }) => {
  return (
    <div className={className}>
      <Image
        src={item.imageUrl}
        alt={item.title}
        className={classes['item-image']}
        imageStyle={classes['item-image__image--round']}
      />
      <div className={classes['actions']}>{actions}</div>
    </div>
  );
};
