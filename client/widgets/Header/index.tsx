"use client"
import React from "react";
import { useRouter } from "next/navigation";

// Types
import { IRoom } from "@/entities/Room/model/type";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { CreateRoomBtn } from "./CreateRoomBtn";
import { AvatarBtn } from "./AvatarBtn";
import { RoomUsers } from "./RoomUsers";

interface IHeaderProps {
  room?: IRoom | null;
}

export const Header: React.FC<IHeaderProps> = ({ room }) => {
  const router = useRouter()

  const handleLeaveRoom = () => {
    router.push("/")
  }

  return (
    <header className="sticky top-0 left-0 w-full flex items-center justify-between gap-2 px-5 py-3 bg-[#212121]">
      <div className="flex items-center gap-2">
        <AvatarBtn/>
      </div>
      {room && (
        <div className="flex items-center gap-2">
          <BaseButton 
            text="Залишити кімнату" 
            onClick={handleLeaveRoom} 
            className="bg-red-500"
          />
          <RoomUsers/>
        </div>
      )}
      {!room && <CreateRoomBtn/>}
    </header>
  )
}