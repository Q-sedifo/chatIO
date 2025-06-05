import React, { useState } from "react";

// Auth
import { useSession } from "next-auth/react";

// Context
import { useRoom } from "@/app/rooms/[roomId]/context/RoomContext";

// Types
import { IUser } from "@/entities/User/model/type";

// Icons
import { HiUsers } from "react-icons/hi2";

export const RoomUsers = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const { room } = useRoom()
  const { data } = useSession()
  const user = data?.user

  if (!room || !user) return null

  return (
    <div className="relative">
      <HiUsers 
        className="text-white cursor-pointer w-[30px] h-[30px]"
      />
      <span className="min-w-[20px] h-5 absolute -right-[5px] -bottom-[5px] text-xs rounded-full p-[2px] bg-black flex items-center justify-center">
        {users.length}
      </span>
    </div>
  )
}