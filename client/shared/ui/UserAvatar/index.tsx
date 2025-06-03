"use client"
import React from "react";
import { useSession } from "next-auth/react";

// Components
import Image from "next/image";

interface IUserAvatarProps {
  onClick?: () => void;
}

export const UserAvatar: React.FC<IUserAvatarProps> = ({ onClick }) => {
  const { data } = useSession()
  const userImage = data?.user?.image
  
  return (
    <div 
      className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer border-2 border-gray-500 relative"
      onClick={onClick && onClick}
    >
      {userImage && (
        <Image
          alt="User image"
          src={userImage}
          width={40}
          height={40}
          className="w-full h-full rounded-full"
        />
      )}
      <span className="absolute block p-[5px] bg-green-500 rounded-full right-0 bottom-0"/>
    </div>
  )
}