import React from "react";
import { useRouter } from "next/navigation";

// Types
import { IRoom } from "../../model/type";

// Components
import Box from "@/shared/ui/Box";

interface IRoomProps {
  room: IRoom;
}

export const Room: React.FC<IRoomProps> = ({ room }) => {
  const router = useRouter()

  const handleJoinRoom = () => {
    router.push(`/rooms/${room.id}`)
  }

  return (
    <Box className="w-full rounded-lg cursor-pointer" onClick={handleJoinRoom}>
      <Box.Content className="w-full flex flex-col gap-2">
        <div 
          className="relative h-[230px] bg-cover bg-center rounded-lg"
          style={{ 
            backgroundImage: `url('https://womo.ua/wp-content/uploads/2021/11/1-1.png')`
          }}
        >
          <div className="absolute w-full left-2 bottom-2 first-letter:uppercase">
            {room.name}
          </div>
        </div>
      </Box.Content>
    </Box>
  )
}