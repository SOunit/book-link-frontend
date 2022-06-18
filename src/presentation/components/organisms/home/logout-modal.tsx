import { FC } from 'react';
import { Button } from '../../atoms';
import classes from './logout-modal.module.scss';

type Props = {
  title: string;
  text?: string;
  onConfirm: any;
  onCancel: any;
};

export const LogoutModal: FC<Props> = ({
  title,
  text,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={classes['logout-modal']}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className={classes['logout-modal__buttons']}>
        <Button
          title="Yes"
          onClick={onConfirm}
          className={classes['logout-modal__button']}
        />
        <Button
          title="No"
          onClick={onCancel}
          className={classes['logout-modal__button']}
        />
      </div>
    </div>
  );
};
