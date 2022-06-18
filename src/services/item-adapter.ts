import { useCallback } from 'react';
import { apiAdapter as API } from './api-adapter';

export const useItemAdapter = () => {
  return {
    createItem: async (title: string, author: string, imageUrl: string) => {
      const graphqlQuery = {
        query: `
                  mutation CreateItem ($data: CreateItemInput!) {
                    createItem(data: $data) {
                      id
                      title
                      author
                      imageUrl
                    }
                  }      
                `,
        variables: {
          data: {
            title,
            author,
            imageUrl,
          },
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    addUserItem: async (userId: string, itemId: string) => {
      const graphqlQuery = {
        query: `
                mutation AddUserItem($userId: ID!, $itemId: ID!){
                  addUserItem(data: {UserId: $userId, ItemId: $itemId}){
                    id
                  }
                }
                `,
        variables: {
          userId,
          itemId,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    deleteUserItem: async (userId: string, itemId: string) => {
      const graphqlQuery = {
        query: `
                  mutation DeleteUserItem($userId: ID!, $itemId: ID!) {
                    deleteUserItem(data: {UserId: $userId, ItemId: $itemId}){
                      id
                    }
                  }
                `,
        variables: {
          userId,
          itemId,
        },
      };

      return API({
        data: graphqlQuery,
      });
    },

    fetchItemsByTitle: async (title: string) => {
      const graphqlQuery = {
        query: `
                query fetchItems ($title: String){
                  itemsByTitle(title: $title){
                    id
                    title
                    author
                    imageUrl
                  }
                }
              `,
        variables: {
          title,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    fetchRandomItems: useCallback(async () => {
      const graphqlQuery = {
        query: `
                query FetchRandomItems {
                  fetchRandomItems {
                    id
                    title
                    author
                    imageUrl
                  }
                }
              `,
      };

      return await API({
        data: graphqlQuery,
      });
    }, []),
  };
};
