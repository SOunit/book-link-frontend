import { useCallback } from 'react';
import { apiAdapter as API } from './api-adapter';

type User = {
  id: string;
  name: string;
  about: string;
  imageUrl: string;
};

export const useUserAdapter = () => {
  return {
    createUser: useCallback(async (id: string) => {
      const graphqlQuery = {
        query: `
          mutation CreateUser($id: ID!){
            createUser(id: $id){
              id
              name
            }
          }
        `,
        variables: {
          id,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    }, []),

    getUserCount: useCallback(async (id: string) => {
      // check user
      const graphqlQuery = {
        query: `
                query GetUserCount($id: ID!){
                  getUserCount(id: $id)
                }
              `,
        variables: {
          id,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    }, []),

    fetchUser: useCallback(async (userId: string) => {
      const graphqlQuery = {
        query: `
                  query fetchUser($id: ID!){
                    user(id: $id){
                      id
                      name
                      about
                      imageUrl
                      Items{
                        id
                        title
                        imageUrl
                      }
                    }
                  }
                `,
        variables: {
          id: userId,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    }, []),

    updateUser: async (user: User) => {
      const { id, name, about, imageUrl } = user;

      const graphqlQuery = {
        query: `
                mutation UpdateUser($id: ID!, $name: String!, $about: String!, $imageUrl: String!){
                  updateUser(data: {
                    id: $id
                    name: $name
                    about: $about
                    imageUrl: $imageUrl
                  }){
                    id
                  }
                }
              `,
        variables: {
          id,
          name,
          about,
          imageUrl,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    fetchUsersByItems: useCallback(
      async (itemIds: string[], loginUserId: string) => {
        const graphqlQuery = {
          query: `
                query fetchUsersByItems($itemIds: [String!]!, $loginUserId: String!){
                  getUsersByItems(itemIds: $itemIds, userId: $loginUserId){
                    id
                    name
                    about
                    imageUrl
                  }
                }
              `,
          variables: {
            itemIds,
            loginUserId,
          },
        };

        return await API({
          data: graphqlQuery,
        });
      },
      [],
    ),
  };
};
