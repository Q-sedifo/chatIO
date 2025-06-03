"use client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSocket } from "@/shared/libs/socket";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { ChatRoom } from "./ui/ChatRoom";
import { SendMessageField } from "./ui/SendMessageField";
import { Loader } from "@/shared/ui/Loader";
import { Header } from "@/widgets/Header";

// Types
import { IMessage } from "@/entities/Message/model/type";
import { IRoom } from "@/entities/Room/model/type";

const Room = () => {
  const [room, setRoom] = useState<IRoom | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const { roomId } = useParams()
  const { data } = useSession()
  const router = useRouter()
  
  const user = data?.user
  const socket = getSocket(user)
  
  useEffect(() => {
    if (!roomId || typeof roomId !== "string") return

    socket.emit("joinRoom", { roomId })

    socket.once("joinedRoom", (data) => {
      setRoom(data)
    })

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

    socket.on("errorJoin", () => {
      router.push("/")
    })

    socket.on("newMessage", (data) => {
      setMessages((prev: IMessage[]) => [...prev, data])
    })

    return () => {
      socket.off("joinedRoom")
      socket.off("userJoined")
      socket.off("errorJoin")
      socket.off("newMessage")
      socket.off("userLeaved")
      socket.emit("leaveRoom", { roomId })
    }
  }, [])

  const handleSendMessage = (message: string) => {
    socket.emit("sendMessage", { 
      roomId,
      message,
    })
  }

  return (
    <div className="w-full h-[100vh] flex flex-col overflow-y-hidden">
      <Header room={room}/>
      <div className="w-full h-[100%] flex overflow-y-hidden">
        {!room ? (
          <Loader/>
        ) : (<>
          <div className="flex flex-1 items-center justify-center">
            <BaseButton text="Link film"/>
          </div>
          <div className="w-[20%] min-w-[300px] max-h-[100%] overflow-y-hidden bg-black flex flex-col">
            <ChatRoom messages={messages} user={user}/>
            <SendMessageField onSendMessage={handleSendMessage}/>
          </div>
        </>)}
        </div>
    </div>
  )
}

export default Room;