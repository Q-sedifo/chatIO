import React from "react";
import { useRouter } from "next/navigation";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";

interface IRoomProps {
  room: string;
}

export const Room: React.FC<IRoomProps> = ({ room }) => {
  const router = useRouter()

  const handleJoinRoom = () => {
    router.push(`/rooms/${room}`)
  }

  return (
    <div className="w-full flex items-center justify-between p-2 capitalize">
      <span>{ room }</span>
        <BaseButton text="Join" onClick={handleJoinRoom}/>
    </div>
  )
}