import { useCallback, useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
import { Message } from "../domain";

export const useSocketAdapter = () => {
  // fixme:any
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    // path without docker is like this
    // { path: 'http://127.0.0.1:3000' }
    const socket = socketIoClient({ path: "/socket.io" });
    setSocket(socket);
  }, []);

  const createMessage = (
    loginUserId: string,
    userId: string,
    message: Message
  ) => {
    socket.emit("create:message", {
      loginUserId,
      userId,
      message,
    });
  };

  const onUpdateChat = useCallback((callback: any, socket: any) => {
    socket.on("update:chat", (message: Message) => {
      callback(message);
    });
  }, []);

  return { socket, createMessage, onUpdateChat };
};
