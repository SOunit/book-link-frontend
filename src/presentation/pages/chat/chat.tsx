import { FC, useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { Message } from '../../../domain';
import {
  useAuthStorage,
  useChatStorage,
  useSocketAdapter,
} from '../../../services';
import {
  useCreateMessage,
  useAddMessageToChat,
  useInitChat,
} from '../../../application';
import { ChatForm, ChatHeader, ChatMessage } from '../../components/organisms';
import classes from './chat.module.css';

type Props = {
  socket: any;
};

type Params = {
  userId: string;
};

export const Chat: FC<Props> = ({ socket }) => {
  const { loginUser } = useAuthStorage();
  const { chat } = useChatStorage();
  const { userId } = useParams<Params>();
  const messagesBoxDivRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');

  const { initChat } = useInitChat();
  const { createMessage } = useCreateMessage();
  const { addMessageToChat } = useAddMessageToChat();
  const { onUpdateChat } = useSocketAdapter();

  const scrollToBottom = () => {
    // wait 100 ms to run after rendering
    setTimeout(() => {
      const htmlTag = document.querySelector('html');
      if (
        htmlTag &&
        messagesBoxDivRef.current &&
        messagesBoxDivRef.current.scrollHeight
      ) {
        htmlTag.scrollTop = messagesBoxDivRef.current.scrollHeight;
      }
    }, 100);
  };

  const changeMessageInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const sendMessageHandler = (event: FormEvent) => {
    event.preventDefault();
    if (messageInput === '') {
      return;
    }

    if (chat && loginUser) {
      createMessage(chat.id, chat.users[0].id, messageInput, loginUser.id);
      setMessageInput('');
    }
  };

  useEffect(() => {
    if (userId && loginUser) {
      initChat([loginUser.id, userId]);
    }

    scrollToBottom();
  }, [userId, loginUser, initChat]);

  useEffect(() => {
    onUpdateChat((message: Message) => {
      addMessageToChat(message);
      scrollToBottom();
    }, socket);
  }, [onUpdateChat, addMessageToChat, socket]);

  let messages;
  if (chat && loginUser) {
    messages = chat.messages.map((message: Message) => {
      let isMine = false;
      if (loginUser.id === message.UserId) {
        isMine = true;
      }
      return (
        <ChatMessage
          key={message.id}
          chat={chat}
          isMine={isMine}
          loginUserId={loginUser.id}
          message={message}
        />
      );
    });
  }

  return (
    <div>
      {chat && <ChatHeader partnerUser={chat.users[0]} />}
      <div ref={messagesBoxDivRef} className={classes['messages-box']}>
        {messages}
      </div>

      <ChatForm
        value={messageInput}
        onChange={changeMessageInputHandler}
        onSubmit={sendMessageHandler}
      />
    </div>
  );
};
