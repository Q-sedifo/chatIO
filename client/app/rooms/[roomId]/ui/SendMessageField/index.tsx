import React, { useState, useRef } from "react";

// Components
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import { BaseInput } from "@/shared/ui/inputs/BaseInput";

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
    messageInput?.current?.focus()
  }

  const handleTypeMessage = (message: string) => {
    setMessage(() => message)
  }

  return (
    <div className="w-full flex gap-2 p-2">
      <BaseInput
        placeholder="Message"
        onChange={handleTypeMessage}
        value={message}
        className="w-full"
        ref={messageInput}
      />
      <BaseButton 
        text="Send" 
        onClick={handleSendMessage}
        disabled={!message}
      />
    </div>
  )
}