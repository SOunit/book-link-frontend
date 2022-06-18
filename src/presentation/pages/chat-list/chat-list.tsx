import { FC, useEffect } from 'react';
import { useInitChatList } from '../../../application';
import { useAuthStorage, useChatStorage } from '../../../services';
import { NotFoundMessage } from '../../components/molecules';
import { ChatList as ChatLogList } from '../../components/organisms';

export const ChatList: FC = () => {
  const { chatList } = useChatStorage();
  const { initChatList } = useInitChatList();
  const authStorage = useAuthStorage();
  const { token } = authStorage;

  useEffect(() => {
    if (token) {
      initChatList(token);
    }
  }, [initChatList, token]);

  return (
    <div>
      {(!chatList || (chatList && chatList.length === 0)) && (
        <NotFoundMessage
          title="No Chat Found"
          text="Let's chat with somebody."
        />
      )}
      {chatList && <ChatLogList chatList={chatList} />}
    </div>
  );
};
