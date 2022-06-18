import { useCallback } from 'react';
import { useChatAdapter, useChatStorage } from '../../services';

export const useInitChat = () => {
  const { fetchChat } = useChatAdapter();
  const { initChat: storageInitChat } = useChatStorage();

  const initChat = useCallback(
    async (userIds: string[]) => {
      const response = await fetchChat(userIds);

      const chat = response.data.data.getUserChat;
      storageInitChat(chat);
    },
    [fetchChat, storageInitChat],
  );

  return { initChat };
};
