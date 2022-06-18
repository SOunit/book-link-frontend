import { useCallback } from 'react';
import { ChatAdapterService } from '../application/ports';
import { apiAdapter } from './api-adapter';

export const useChatAdapter = (): ChatAdapterService => {
  return {
    fetchChat: useCallback(async (userIds: string[]) => {
      const graphqlQuery = {
        query: `
                query GetUserChat($userIds: [ID!]!){
                  getUserChat(userIds: $userIds){
                    id
                    users{
                      id
                      name
                      imageUrl
                    }
                    messages{
                      id
                      ChatId
                      UserId
                      text
                      createdAt
                    }
                  }
                }
              `,
        variables: {
          userIds,
        },
      };

      return await apiAdapter({
        data: graphqlQuery,
      });
    }, []),

    fetchChatList: useCallback(async (userId: string) => {
      const graphqlQuery = {
        query: `
                query GetUserChatList($userId: ID!){
                  getUserChatList(userId: $userId){
                    id
                    users{
                      id
                      name
                      imageUrl
                    }
                    messages{
                      id
                      UserId
                      text
                      createdAt
                    }
                  }
                }
              `,
        variables: {
          userId,
        },
      };

      return await apiAdapter({
        data: graphqlQuery,
      });
    }, []),

    createChat: async (userId: string, targetId: string) => {
      const graphqlQuery = {
        query: `
                mutation CreateChat($targetId: ID!, $userId: ID!){
                  createChat(targetId: $targetId, userId: $userId){
                    id
                    users{
                      id
                      name
                      imageUrl
                    }
                    messages{
                      id
                      text
                    }
                  }
                }
              `,
        variables: {
          userId,
          targetId,
        },
      };

      return await apiAdapter({
        data: graphqlQuery,
      });
    },

    createMessage: async (chatId: string, userId: string, text: string) => {
      const graphqlQuery = {
        query: `
                mutation CreateMessage($chatId: ID!, $userId: ID!, $text: String!){
                  createMessage(chatId: $chatId, userId: $userId, text: $text){
                    id
                    ChatId
                    UserId
                    text
                    createdAt
                  }
                }
              `,
        variables: {
          chatId,
          userId,
          text,
        },
      };

      return await apiAdapter({
        data: graphqlQuery,
      });
    },
  };
};
