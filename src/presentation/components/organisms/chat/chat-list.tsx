import { FC, Fragment } from 'react';
import { Chat } from '../../../../domain';
import { ChatListItem } from '../../molecules';

type Props = {
  chatList: Chat[];
};

export const ChatList: FC<Props> = ({ chatList }) => {
  return (
    <Fragment>
      {chatList.map((chat) => (
        <ChatListItem chat={chat} key={chat.id} />
      ))}
    </Fragment>
  );
};
