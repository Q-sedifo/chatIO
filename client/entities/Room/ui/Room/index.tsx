import React from "react";
import { useRouter } from "next/navigation";

// Types
import { IRoom } from "../../model/type";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

interface IRoomProps {
  room: IRoom;
}

export const Room: React.FC<IRoomProps> = ({ room }) => {
  const router = useRouter()

  const handleJoinRoom = () => {
    router.push(`/rooms/${room.id}`)
  }

  return (
    <div className="w-full flex items-center justify-between p-2 capitalize">
      <span>{ room.name }</span>
        <BaseButton text="Join" onClick={handleJoinRoom}/>
    </div>
  )
}