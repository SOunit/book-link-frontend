import { apiAdapter as API } from './api-adapter';

export const useFollowAdapter = () => {
  return {
    fetchFollowing: async (userId: string, followingUserId: string) => {
      const graphqlQuery = {
        query: `
                query fetchFollowing($userId: ID!, $followingUserId: ID!){
                  following(userId: $userId, followingUserId: $followingUserId){
                    userId
                    followingUserId
                  }
                }
              `,
        variables: {
          userId,
          followingUserId,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    deleteFollowing: async (followingUserId: string, userId: string) => {
      const graphqlQuery = {
        query: `
                    mutation DeleteFollowing($userId: ID!, $followingUserId: ID!){
                      deleteFollowing(userId: $userId, followingUserId: $followingUserId)
                    }
                    `,
        variables: {
          followingUserId,
          userId,
        },
      };

      await API({
        data: graphqlQuery,
      });
    },

    createFollowing: async (followingUserId: string, userId: string) => {
      const graphqlQuery = {
        query: `
                    mutation CreateFollowing($userId: ID!, $followingUserId: ID!){
                      createFollowing(userId: $userId, followingUserId: $followingUserId)
                    }
                    `,
        variables: {
          followingUserId,
          userId,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    fetchFollowingUsers: async (targetUserId: string, loginUserId: string) => {
      const graphqlQuery = {
        query: `
                query GetFollowingUsers($targetUserId: ID!, $loginUserId: ID!){
                  getFollowingUsers(targetUserId: $targetUserId, loginUserId: $loginUserId,){
                    id
                    name
                    imageUrl
                    isFollowing
                  }
                }
                `,
        variables: {
          targetUserId,
          loginUserId,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },

    fetchFollowerUsers: async (targetUserId: string, loginUserId: string) => {
      const graphqlQuery = {
        query: `
                query GetFollowerUsers($targetUserId: ID!, $loginUserId: ID!){
                  getFollowerUsers(targetUserId: $targetUserId, loginUserId: $loginUserId){
                    id
                    name
                    imageUrl
                    isFollowing
                  }
                }
                `,
        variables: {
          targetUserId,
          loginUserId,
        },
      };

      return await API({
        data: graphqlQuery,
      });
    },
  };
};
