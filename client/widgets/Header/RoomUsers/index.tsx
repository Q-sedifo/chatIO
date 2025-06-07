import React, { useState } from "react";

// Context
import { useRoom } from "@/app/rooms/[roomId]/context/RoomContext";

// Types
import { IUser } from "@/entities/User/model/type";

// Components
import Box from "@/shared/ui/Box";

// Icons
import { HiUsers } from "react-icons/hi2";

export const RoomUsers = () => {
  const [isUsersListOpen, setIsUsersListOpen] = useState<boolean>(false)
  const { room } = useRoom()

  if (!room) return null

  const toggleUsersList = () => {
    setIsUsersListOpen(prev => !prev)
  }

  return (
    <div className="relative cursor-pointer" onClick={toggleUsersList}>
      <HiUsers 
        className="text-white w-[30px] h-[30px]"
      />
      <span className="min-w-[20px] h-5 absolute -right-[5px] -bottom-[5px] text-xs rounded-full p-[2px] bg-black flex items-center justify-center">
        {room.users.length}
      </span>
      {isUsersListOpen && (
        <Box className="w-fit absolute right-0 -bottom-[50px] -translate-x-[100%] !bg-black">
          <Box.Content className="flex-col gap-2">
            {room.users.map((user: IUser, index: number) => (
              <div key={index}>{user.name}</div>
            ))}
          </Box.Content>
        </Box>
      )}
    </div>
  )
}