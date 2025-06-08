import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";

// Context
import { useRoom } from "../../context/RoomContext";

// Socket
import { getSocket } from "@/shared/libs/socket";

// Components
import { Messages } from "./ui/Messages";
import { SendMessageField } from "./ui/SendMessageField";

// Types
import { IMessage } from "@/entities/Message/model/type";

export const ChatRoom = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const { room } = useRoom()

  // Getting auth user
  const { data } = useSession()
  const user = data?.user

  const socket = getSocket(user)

  useEffect(() => {
    socket.on("joinedRoom", ({ user }) => {
      const message = `${user.name} приєднався`
      handleReceiveMessage(message)
    })

    socket.on("userLeaved", ({ user }) => {
      const message = `${user.name} вийшов`
      handleReceiveMessage(message)
    })

    socket.on("newMessage", (data) => {
      setMessages((prev: IMessage[]) => [...prev, data])
    })

    return () => {
      socket.off("joinedRoom")
      socket.off("userLeaved")
      socket.off("newMessage")
    }
  }, [])

  const handleSendMessage = (message: string) => {
    socket.emit("sendMessage", { 
      roomId: room?.id,
      message,
    })
  }

  const handleReceiveMessage = (message: string) => {
    setMessages((prev: IMessage[]) => [...prev, {
      id: nanoid(),
      text: message,
      info: true
    }])
  }

  return (
    <div className="w-[20%] min-w-[300px] max-h-[100%] h-[100%] overflow-y-hidden bg-black flex flex-col">
      <Messages messages={messages}/>
      <SendMessageField onSendMessage={handleSendMessage}/>
    </div>  
  )
}