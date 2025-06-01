"use client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSocket } from "@/shared/libs/socket";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { ChatRoom } from "./ui/ChatRoom";
import { SendMessageField } from "./ui/SendMessageField";

const socket = getSocket()

const Room = () => {
  const [isJoined, setIsJoined] = useState<boolean>(false)
  const [messages, setMessages] = useState<any>([])
  const { roomName } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!roomName || typeof roomName !== "string") return

    socket.emit("joinRoom", { roomName })

    socket.on("joinedRoom", (data) => {
      setIsJoined(true)
    })

    socket.on("userJoined", ({ id }) => {
      setMessages((prev: any) => [...prev, {
        message: `${id} joined the room`,
        info: true
      }])
    })

    socket.on("errorJoin", (data) => {
      router.push("/")
    })

    socket.on("newMessage", (data) => {
      setMessages((prev: any) => [...prev, data])
    })

    return () => {
      socket.off("joinedRoom")
      socket.off("userJoined")
      socket.off("errorJoin")
      socket.off("newMessage")
      socket.emit("leaveRoom", { roomName })
    }
  }, [])

  const handleLeaveRoom = () => {
    router.push("/")
  }

  const handleSendMessage = (message: any) => {
    socket.emit("sendMessage", { 
      roomName,
      message
    })
  }

  return (
    <div className="relative w-full h-[100vh] flex">
      {!isJoined ? (
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
              {roomName}
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