export type Message = {
  id: string;
  UserId: string;
  ChatId: string;
  text: string;
  createdAt?: string;
};

export const getDisplayTime = (createdAt: string) => {
  const items = new Date(createdAt).toLocaleTimeString().split(':');
  items.splice(-1, 1);

  return items.join(':');
};
