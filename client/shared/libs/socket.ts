import { io, Socket } from "socket.io-client";

// Types
import { IUser } from "@/entities/User/model/type";

let socket: Socket | null = null

export const getSocket = (user: IUser | undefined): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SERVER_API, {
      transports: ["websocket"],
      auth: user
    })
  }

  return socket
}