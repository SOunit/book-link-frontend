import { FC } from 'react';
import { useHistory } from 'react-router';
import { Chat, getDisplayTime } from '../../../../domain/';
import { Image } from '../../atoms';
import classes from './chat-list-item.module.css';

type ChatListItemProps = {
  chat: Chat;
};

export const ChatListItem: FC<ChatListItemProps> = ({ chat }) => {
  const history = useHistory();
  const chatPartnerUser = chat.users[0];
  const latestMessage = chat.messages[0];

  const clickHandler = () => {
    history.push(`/chats/${chat.users[0].id}`);
  };

  const getSummaryMessage = (text: string) => {
    let summaryMessage = text;

    const words = text.split(' ');
    let changed = false;

    let maxCount = 10;
    if (words.length > maxCount) {
      words.splice(maxCount);
      summaryMessage = words.join(' ');
      changed = true;
    }

    maxCount = 50;
    if (summaryMessage.length > maxCount) {
      summaryMessage = text.substr(0, maxCount);
      changed = true;
    }

    if (changed) {
      summaryMessage += '...';
    }

    return summaryMessage;
  };

  let messageSummary = null;
  if (chat.messages && chat.messages.length > 0) {
    messageSummary = getSummaryMessage(latestMessage.text);
  }

  return (
    <div className={classes.chatListItem} onClick={clickHandler}>
      <div className={classes['image-wrapper']}>
        <Image
          src={chatPartnerUser.imageUrl}
          alt={chatPartnerUser.name}
          className={classes['chat-list-item__image']}
        />
      </div>
      <div className={classes['chatListItem__details']}>
        <div className={classes['chatListItem__name']}>
          {chatPartnerUser.name}
        </div>
        <div className={classes['chatListItem__text']}>{messageSummary}</div>
      </div>
      {latestMessage && latestMessage.createdAt && (
        <div className={classes['chatListItem__time']}>
          {getDisplayTime(latestMessage.createdAt)}
        </div>
      )}
    </div>
  );
};
