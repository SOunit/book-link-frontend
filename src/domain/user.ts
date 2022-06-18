import { Item } from './item';

export type User = {
  id: string;
  name: string;
  imageUrl: string;
  about?: string;
  Items?: Item[];
  isFollowing?: boolean;
};
