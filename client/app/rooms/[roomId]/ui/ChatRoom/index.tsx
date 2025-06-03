import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion"

// Components
import { Message } from "@/entities/Message/ui/Message";

// Types
import { IMessage } from "@/entities/Message/model/type";
import { IUser } from "@/entities/User/model/type";

interface IChatRoomProps {
  messages: IMessage[];
  user?: IUser;
}

export const ChatRoom: React.FC<IChatRoomProps> = ({ messages, user }) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="w-full max-h-[100%] flex-2 overflow-y-auto bg-emerald-500">
      <AnimatePresence initial={false}>
        {messages.map((message: IMessage) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Message message={message} user={user}/>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>  
  )
}