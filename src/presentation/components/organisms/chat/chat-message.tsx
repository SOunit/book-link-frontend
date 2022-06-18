import { FC } from 'react';
import { Chat, Message, getDisplayTime } from '../../../../domain/';
import { Image } from '../../atoms';
import classes from './chat-message.module.scss';

type Props = {
  message: Message;
  chat: Chat;
  loginUserId: string;
  isMine: boolean;
  className?: string;
};

export const ChatMessage: FC<Props> = ({
  message,
  chat,
  loginUserId,
  isMine,
}) => {
  return (
    <div
      className={`${classes['message']} ${isMine && classes['message--mine']}`}
      key={message.id}>
      {!isMine && (
        <div className={`${classes['image-container']}`}>
          <Image
            src={chat.users[0].imageUrl}
            alt={chat.users[0].name}
            className={classes['message__image']}
          />
        </div>
      )}
      <div
        className={
          message.UserId === loginUserId
            ? `${classes['message__text']} ${classes['message__text--mine']}`
            : classes['message__text']
        }>
        {message.text}
      </div>
      {message.createdAt && (
        <div className={classes['message__time']}>
          {getDisplayTime(message.createdAt)}
        </div>
      )}
    </div>
  );
};
