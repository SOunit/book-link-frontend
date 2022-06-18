import { useCallback } from 'react';
import { Message } from '../../domain';
import { useChatStorage } from '../../services';

export const useAddMessageToChat = () => {
  const { addMessageToChat: storageAddMessageToChat } = useChatStorage();

  const addMessageToChat = useCallback(
    (message: Message) => {
      storageAddMessageToChat(message);
    },
    [storageAddMessageToChat],
  );

  return {
    addMessageToChat,
  };
};
