import { FC } from 'react';
import classes from './not-found-message.module.scss';

type Props = {
  title: string;
  text?: string;
};

export const NotFoundMessage: FC<Props> = ({ title, text }) => {
  return (
    <div className={classes['message-box']}>
      <h2 className={classes['message__title']}>{title}</h2>
      <p className={classes['message__text']}>{text}</p>
    </div>
  );
};
