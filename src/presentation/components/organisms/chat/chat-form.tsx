import { FC } from 'react';
import classes from './chat-form.module.scss';

type Props = {
  onSubmit: any;
  onChange: any;
  value: string;
};

export const ChatForm: FC<Props> = ({ value, onSubmit, onChange }) => {
  return (
    <div className={classes['form-wrapper']}>
      <form onSubmit={onSubmit} className={classes['message-form']}>
        <input
          value={value}
          onChange={onChange}
          className={classes['message-input']}
          type="text"
          placeholder="Enter a message"
        />
      </form>
    </div>
  );
};
