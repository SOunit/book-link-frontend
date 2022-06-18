import { User } from '../../domain';
import { useChatAdapter, useChatStorage } from '../../services';

export const useCreateChat = () => {
  const storage = useChatStorage();
  const adapter = useChatAdapter();

  const createChat = (loginUser: User, targetUser: User): Promise<any> => {
    return adapter.createChat(loginUser.id, targetUser.id).then((res) => {
      const chat = res.data.data.createChat;
      storage.addChat(chat);
    });
  };

  return { createChat };
};
