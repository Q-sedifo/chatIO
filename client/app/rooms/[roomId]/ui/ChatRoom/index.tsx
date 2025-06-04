import React, { useState, useEffect, useRef } from "react";
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
  const bottomRef = useRef<HTMLDivElement>(null)
  const { room } = useRoom()

  // Getting auth user
  const { data } = useSession()
  const user = data?.user

  const socket = getSocket(user)

  useEffect(() => {
    socket.on("userJoined", (user) => {
      setMessages((prev: IMessage[]) => [...prev, {
        id: nanoid(),
        text: `${user.name} joined the room`,
        info: true
      }])
    })

    socket.on("userLeaved", (user) => {
      setMessages((prev: IMessage[]) => [...prev, {
        id: nanoid(),
        text: `${user.name} leaved the room`,
        info: true
      }])
    })

    socket.on("newMessage", (data) => {
      setMessages((prev: IMessage[]) => [...prev, data])
    })

    return () => {
      socket.off("userJoined")
      socket.off("userLeaved")
      socket.off("newMessage")
    }
  }, [])

  useEffect(() => {
    // Scroll to chat bottom if new message received
    bottomRef.current?.scrollIntoView({ 
      behavior: "smooth" 
    })
  }, [messages])

  const handleSendMessage = (message: string) => {
    socket.emit("sendMessage", { 
      roomId: room?.id,
      message,
    })
  }

  return (
    <div className="w-[20%] min-w-[300px] max-h-[100%] overflow-y-hidden bg-black flex flex-col">
      <Messages messages={messages}/>
      <SendMessageField onSendMessage={handleSendMessage}/>
    </div>  
  )
}