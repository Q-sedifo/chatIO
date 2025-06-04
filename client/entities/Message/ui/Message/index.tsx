import React from "react";
import cn from "classnames";
import { useSession } from "next-auth/react";

// Types
import { IMessage } from "../../model/type";

// Components
import Box from "@/shared/ui/Box";
import Image from "next/image";

interface IMessageProps {
  message: IMessage;
}

export const Message: React.FC<IMessageProps> = ({ message }) => {
  const isInfoMessage = message?.info

  // Getting auth user
  const { data } = useSession()
  const user = data?.user

  const isMyMessage = user?.id === message?.sender?.id

  return (
    <div className={cn("w-full flex p-2 items-end gap-2", {
      "flex-row-reverse": isMyMessage
    })}>
      {isInfoMessage ? (
        <div className="w-full flex justify-center text-center break-keep text-xs">
          {message.text}
        </div>
      ) : (<>
        <Image 
          alt="User avatar" 
          src={message?.sender?.image || ""} 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <Box className={cn("max-w-[60%] !w-fit !p-3", {
          "rounded-br-none": isMyMessage,
          "rounded-bl-none": !isMyMessage,
        })}>
          <Box.Content className="break-keep text-xs overflow-x-hidden">
            <div>
              <small className="text-gray-500">
                {isMyMessage ? "Ви" : message?.sender?.name}
              </small>
            </div>
            <span className="text-lg">{message.text}</span>
          </Box.Content>
        </Box>
      </>)}
    </div>
  )
}