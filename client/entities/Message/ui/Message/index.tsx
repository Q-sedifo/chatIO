import React from "react";
import cn from "classnames";
import { useSession } from "next-auth/react";

// Types
import { IMessage } from "../../model/type";

// Components
import Box from "@/shared/ui/Box";
import Image from "next/image";

// Utils
import { formatTime } from "@/shared/utils/Time";

interface IMessageProps {
  message: IMessage;
}

export const Message: React.FC<IMessageProps> = ({ message }) => {
  // Getting auth user
  const { data } = useSession()
  const user = data?.user

  const isMyMessage = user?.id === message?.sender?.id
  const time = formatTime(message.timestamp)

  return (
    <div className={cn("w-full flex p-2 items-end gap-2", {
      "flex-row-reverse": isMyMessage
    })}>
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
          <span className="text-lg">{message.text}</span>
          <div>
            <small className="w-full flex items-center justify-between gap-5 text-gray-500">
              {isMyMessage ? "Ви" : message?.sender?.name}
              <span>{time}</span>
            </small>
          </div>
        </Box.Content>
      </Box>
    </div>
  )
}