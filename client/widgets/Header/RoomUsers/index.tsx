import React, { useState } from "react";

// Context
import { useRoom } from "@/app/rooms/[roomId]/context/RoomContext";

// Types
import { IUser } from "@/entities/User/model/type";

// Components
import Box from "@/shared/ui/Box";
import { UserAvatar } from "@/shared/ui/UserAvatar";

// Icons
import { HiUsers } from "react-icons/hi2";

export const RoomUsers = () => {
  const [isUsersListOpen, setIsUsersListOpen] = useState<boolean>(false)
  const { room } = useRoom()

  if (!room) return null

  const toggleUsersList = () => {
    setIsUsersListOpen(prev => !prev)
  }

  return room?.users?.length < 5 ? (
    <div className="flex">
      {room.users.map((user: IUser, index: number) => (
        <UserAvatar 
          key={index}
          user={user}  
          className="!w-[30px] !h-[30px] -ml-3 first:ml-0" 
          isCreator={room.creator.id === user.id}
        />
      ))}
    </div>
  ) : (
    <div>
      <div className="relative cursor-pointer" onClick={toggleUsersList}>
        <HiUsers 
          className="text-white w-[30px] h-[30px]"
        />
        <span className="min-w-[20px] h-5 absolute -right-[5px] -bottom-[5px] text-black text-xs rounded-full p-[2px] bg-emerald-500 flex items-center justify-center">
          {room.users.length}
        </span>
      </div>
      {isUsersListOpen && (
        <Box className="!w-fit absolute right-5 bottom-2 translate-y-full !p-3 !bg-black">
          <Box.Content className="flex gap-2">
            {room.users.map((user: IUser, index: number) => (
              <UserAvatar 
                user={user} 
                key={index} 
                isCreator={room.creator.id === user.id}
              />
            ))}
          </Box.Content>
          <div className="after:content-[''] after:absolute after:-top-2 after:right-4 after:border-l-8 after:border-r-8 after:border-b-8 after:border-l-transparent after:border-r-transparent after:border-b-black" />
        </Box>
      )}
    </div>
  )
}