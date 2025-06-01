"use client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSocket } from "@/shared/libs/socket";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { ChatRoom } from "./ui/ChatRoom";
import { SendMessageField } from "./ui/SendMessageField";

// Types
import { IMessage } from "@/entities/Message/model/type";
import { IRoom } from "@/entities/Room/model/type";

const socket = getSocket()

const Room = () => {
  const [room, setRoom] = useState<IRoom | null>(null)
  const [messages, setMessages] = useState<IMessage[]>([])
  const { roomId } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!roomId || typeof roomId !== "string") return

    socket.emit("joinRoom", { roomId })

    socket.on("joinedRoom", (data) => {
      setRoom(data)
    })

    socket.on("userJoined", ({ id }) => {
      setMessages((prev: any) => [...prev, {
        text: `${id} joined the room`,
        info: true
      }])
    })

    socket.on("errorJoin", (data) => {
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
      socket.emit("leaveRoom", { roomId })
    }
  }, [])

  const handleLeaveRoom = () => {
    router.push("/")
  }

  const handleSendMessage = (message: string) => {
    socket.emit("sendMessage", { 
      roomId,
      message
    })
  }

  return (
    <div className="relative w-full h-[100vh] flex">
      {!room ? (
        <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center">
          <h1>Loading...</h1>
        </div>
      ) : (<>
        <div className="flex flex-1 items-center justify-center">
          <BaseButton text="Link film"/>
        </div>
        <div className="w-[20%] bg-black flex flex-col">
          <div className="py-2">
            <div className="text-center mb-2 font-bold capitalize">
              {room.name}
            </div>
            <BaseButton 
              text="Leave room" 
              onClick={handleLeaveRoom} 
              className="bg-red-500 m-[auto]"
            />
          </div>
          <ChatRoom messages={messages}/>
          <SendMessageField onSendMessage={handleSendMessage}/>
        </div>
      </>)}
    </div>
  )
}

export default Room;