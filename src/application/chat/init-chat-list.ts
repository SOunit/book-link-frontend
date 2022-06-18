import { useCallback } from 'react';
import { useChatAdapter, useChatStorage } from '../../services';

export const useInitChatList = () => {
  const { fetchChatList } = useChatAdapter();
  const { initChatList: storageInitChatList } = useChatStorage();

  const initChatList = useCallback(
    async (userId: string) => {
      // fetch data
      const response = await fetchChatList(userId);
      const chatList = response.data.data.getUserChatList;

      // update state
      if (chatList) {
        storageInitChatList(chatList);
      }
    },
    [fetchChatList, storageInitChatList],
  );

  return {
    initChatList,
  };
};
