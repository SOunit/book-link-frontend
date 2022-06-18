import { User } from './user';
import { Message } from './message';

export type Chat = {
  id: string;
  users: User[];
  messages: Message[];
};
