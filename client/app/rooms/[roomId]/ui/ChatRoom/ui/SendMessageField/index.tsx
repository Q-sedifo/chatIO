import React, { useState, useEffect, useRef } from "react";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { BaseInput } from "@/shared/ui/inputs/BaseInput";

// Icons
import { GrSend } from "react-icons/gr";

interface ISendMessageProps {
  onSendMessage: (message: string) => void;
}

export const SendMessageField: React.FC<ISendMessageProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("")
  const messageInput = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (!message) return

    onSendMessage(message)
    setMessage("")
    // Focus input after sending message
    focusMessageField()
  }

  const handleTypeMessage = (message: string) => {
    setMessage(() => message)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const focusMessageField = () => {
    messageInput?.current?.focus()
  }

  useEffect(() => {
    focusMessageField()
  }, [])

  return (
    <div className="w-full flex gap-2 p-2">
      <BaseInput
        placeholder="Повідомлення..."
        onChange={handleTypeMessage}
        onKeyDown={handleInputKeyDown}
        value={message}
        className="w-full"
        ref={messageInput}
      />
      <BaseButton 
        icon={<GrSend className="w-[20px] h-[20px]"/>} 
        onClick={handleSendMessage}
        disabled={!message}
      />
    </div>
  )
}