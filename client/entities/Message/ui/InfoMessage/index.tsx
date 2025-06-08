import React from "react";

// Types
import { IMessage } from "../../model/type";

interface IInfoMessafeProps {
  message: IMessage;
}

export const InfoMessage: React.FC<IInfoMessafeProps> = ({ message }) => {
  return (
    <div className="w-full flex justify-center text-center break-keep text-xs pt-2">
      {message.text}
    </div>
  )
}