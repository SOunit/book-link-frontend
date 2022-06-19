import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "../domain";
import { keys } from "../presentation/util";

export const useSocketAdapter = () => {
  // fixme:any
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    // path without docker is like this
    // { path: 'http://127.0.0.1:5000' }
    const path = keys.SOCKET_REQUEST_URL;

    const socket = io(path);

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
