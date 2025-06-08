"use client"
import React from "react";
import { useSession } from "next-auth/react";
import cn from "classnames";

// Components
import Image from "next/image";

// Types
import { IUser } from "@/entities/User/model/type";

// Icons
import { FaCrown } from "react-icons/fa";

interface IUserAvatarProps {
  onClick?: () => void;
  withIndicator?: boolean;
  user?: IUser;
  className?: string;
  isCreator?: boolean;
}

export const UserAvatar: React.FC<IUserAvatarProps> = ({ 
  onClick, withIndicator = false, user, className, isCreator = false
}) => {
  const { data } = useSession()
  const userImage = user ? user?.image : data?.user?.image
  
  return (
    <div 
      className={cn("relative w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer border-2 border-gray-500 relative", className)}
      onClick={onClick && onClick}
    >
      {isCreator && (
        <FaCrown className="absolute top-0 -translate-y-[80%] text-amber-500 z-[-1]"/>
      )}
      {userImage && (
        <Image
          alt="User image"
          src={userImage}
          width={40}
          height={40}
          className="w-full h-full rounded-full"
        />
      )}
      {withIndicator && (
        <span className="absolute block p-[5px] bg-green-500 rounded-full right-0 bottom-0"/>
      )}
    </div>
  )
}