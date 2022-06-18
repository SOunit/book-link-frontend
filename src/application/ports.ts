import { Item, User } from '../domain';

export interface UserStorageService {
  token: '';
  isLoggedIn: false;
  login: (token?: string) => void;
  logout: () => void;
  loginUser: User | null;
  updateLoginUser: (user: User) => void;
}

export interface ImageStorageService {
  uploadImage: (image: File) => Promise<string | undefined>;
}

export interface FollowStorageService {
  followings: any[];
  followers: any[];
  isFollowersLoaded: boolean;
  isFollowingsLoaded: boolean;
  addUserToFollowers: (followingUser: User) => void;
  removeUserFromFollowers: (followingUser: User) => void;
  addUserToFollowings: (followerUser: User) => void;

  updateIsFollowingInFollowers: (
    userInFollowers: User,
    toFollowing: boolean,
  ) => void;
  updateIsFollowingInFollowings: (
    followerUser: User,
    toFollowing: boolean,
  ) => void;
  initFollowIsLoaded: () => void;
  initFollowings: (followings: User[]) => void;
  initFollowers: (followers: User[]) => void;
}

export interface SearchStorageService {
  isItemSearched: boolean;
  isUserSearched: boolean;
  searchedItems: Item[];
  registeredItems: Item[];
  searchedUsers: User[];
  clearSearchState: () => void;
  followUser: (followingUser: User, followerUser: User) => void;
  unFollowUser: (followingUser: User, followerUser: User) => void;
  registerItem: (item: Item) => void;
  unRegisterItem: (itemId: string) => void;
  setSearchedItems: (searchedItems: Item[]) => void;
  setSearchedUsers: (searchedUsers: User[]) => void;
  setRegisteredItems: (items: Item[]) => void;
  updateIsItemSearched: (isItemSearched: boolean) => void;
  updateIsUserSearched: (isUserSearched: boolean) => void;
}

export interface FollowAdapterService {
  fetchFollowingUsers(targetUserId: string, loginUserId: string): Promise<any>;
  fetchFollowerUsers(targetUserId: string, loginUserId: string): Promise<any>;
  createFollowing(followingUserId: string, userId: string): Promise<any>;
  deleteFollowing(followingUserId: string, userId: string): Promise<any>;
}

export interface AuthTokenStorageService {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

export interface AuthenticateService {
  auth(): Promise<string | null>;
  logout(): void;
}

export interface ChatAdapterService {
  fetchChat(userIds: string[]): Promise<any>;
  fetchChatList(userId: string): Promise<any>;
  createChat(userId: string, targetId: string): Promise<any>;
  createMessage(chatId: string, userId: string, text: string): Promise<any>;
}
