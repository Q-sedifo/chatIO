import React, { useEffect, useRef } from "react";

// Components
import Box from "@/shared/ui/Box";

interface IMessage {
  message: string;
  sender: string;
  timestamp: Date;
}

interface IChatRoomProps {
  messages: IMessage[];
}

export const ChatRoom: React.FC<IChatRoomProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full h-[100%] overflow-y-auto bg-amber-500">
      {messages.map((message, index) => (
        <div className="p-2" key={index}>
          <Box className="max-w-[60%]">
            <Box.Content className="break-all">
              <div><small className="text-gray-500">John</small></div>
              {message.message}
            </Box.Content>
          </Box>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>  
  )
}