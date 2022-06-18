import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../../../domain/';
import classes from './chat-header.module.scss';

type Props = {
  partnerUser: User;
};

export const ChatHeader: FC<Props> = ({ partnerUser }) => {
  const history = useHistory();

  const chatHeaderClickHandler = () => {
    history.push('/chats');
  };

  return (
    <div className={classes['chat-header']} onClick={chatHeaderClickHandler}>
      <i
        className={`far fa-angle-left ${classes['char-header__left-icon']}`}></i>
      {partnerUser.name}
    </div>
  );
};
