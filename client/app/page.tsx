"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "@/shared/libs/socket";

// Components
import Box from "@/shared/ui/Box";
import { CreateRoom } from "./(ui)/CreateRoom";
import { Room } from "@/entities/Room/ui/Room";

const socket = getSocket()

export default function Home() {
  const [rooms, setRooms] = useState<string[]>([])
  const router = useRouter()

  const handleCreateRoom = (roomName: string) => {
    socket.emit("createRoom", { name: roomName })
    router.push(`/rooms/${roomName}`)
  }

  useEffect(() => {
    socket.emit("getRooms")

    socket.on("roomsList", (roomList: string[]) => {
      setRooms(roomList)
    })

    socket.on("roomCreated", (data) => {
      setRooms((prev) => [...prev, data.name])
    })

    return () => {
      socket.off("roomCreated")
      socket.off("roomsList")
    }
  }, [])

  return (
    <div className="flex flex-col gap-5 p-5">
      <CreateRoom handleCreateRoom={handleCreateRoom}/>
      <Box>
        <Box.Title>Rooms {rooms?.length}</Box.Title>
        <Box.Content className="w-full flex flex-col gap-2">
          {rooms.map((room, index) => (
            <Room key={room + index} room={room}/>
          ))}
        </Box.Content>
      </Box>
    </div>
  )
}
