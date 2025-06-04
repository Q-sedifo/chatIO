"use client"
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSocket } from "@/shared/libs/socket";
import { useSession } from "next-auth/react";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { ChatRoom } from "@/app/rooms/[roomId]/ui/ChatRoom";
import { Loader } from "@/shared/ui/Loader";
import { Header } from "@/widgets/Header";

// Context
import { useRoom } from "@/app/rooms/[roomId]/context/RoomContext";

export const Room = () => {
  const { roomId } = useParams()
  const router = useRouter()

  // Getting auth user
  const { data } = useSession()
  const user = data?.user

  const socket = getSocket(user)

  const { room, setRoom } = useRoom()

  // Initializing room
  useEffect(() => {
    if (!roomId || typeof roomId !== "string") return

    socket.emit("joinRoom", { roomId })

    socket.once("joinedRoom", (data) => {
      setRoom(data)
    })

    socket.on("errorJoin", () => {
      router.push("/")
    })

    return () => {
      socket.off("joinedRoom")
      socket.off("errorJoin")
    }
  }, [])

  return room ? (
    <div className="w-full h-[100vh] flex flex-col overflow-y-hidden">
      <Header room={room}/>
      <div className="w-full h-[100%] flex overflow-y-hidden">
        <div className="flex flex-1 items-center justify-center">
          <BaseButton text="Link film"/>
        </div>
        <ChatRoom/>
      </div>
    </div>
  ) : (
    <Loader/>
  )
}