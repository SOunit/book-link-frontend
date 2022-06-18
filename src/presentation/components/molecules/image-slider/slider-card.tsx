import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import classes from './slider-card.module.css';

type Props = {
  icon: any;
  title: string;
  text: string;
};

export const SliderCard: FC<Props> = ({ icon, title, text }) => {
  return (
    <div className={classes['slider-card']}>
      <FontAwesomeIcon className={classes['slider-card__icon']} icon={icon} />
      <h2 className={classes['slider-card__title']}>{title}</h2>
      <p className={classes['slider-card__text']}>{text}</p>
    </div>
  );
};
