"use client"
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// Types
import { IRoom } from "@/entities/Room/model/type";

// Components
import Box from "@/shared/ui/Box";
import { CreateRoom } from "./(ui)/CreateRoom";
import { Room } from "@/entities/Room/ui/Room";

// Requests
import { getRooms, createRoom } from "@/entities/Room/api";

export default function Home() {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms()
  })

  const handleCreateRoom = async (roomName: string) => {
    const { success, newRoom } = await createRoom(roomName)
    
    if (!success) return
    router.push(`/rooms/${newRoom.id}`)
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <CreateRoom handleCreateRoom={handleCreateRoom}/>
      <Box>
        <Box.Title>Rooms {data?.length}</Box.Title>
        <Box.Content className="w-full flex flex-col gap-2">
          {isLoading && (<>Loading...</>)}
          {data && data.map((room: IRoom, index: number) => (
            <Room key={room.id + index} room={room} />
          ))}
        </Box.Content>
      </Box>
    </div>
  )
}
