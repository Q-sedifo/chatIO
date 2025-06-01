import React, { useState } from "react";

// Components
import { BaseInput } from "@/shared/ui/inputs/BaseInput";
import { BaseButton } from "@/shared/ui/buttons/BaseButton";
import Box from "@/shared/ui/Box";

interface ICreateRoomProps {
  handleCreateRoom: (roomName: string) => void;
}

export const CreateRoom: React.FC<ICreateRoomProps> = ({ handleCreateRoom }) => {
  const [roomName, setRoomName] = useState<string>("")

  const handleSetRoomName = (name: string) => {
    setRoomName(() => name)
  }

  const handleCreateRoomClick = () => {
    if (!roomName) return

    handleCreateRoom(roomName)
    setRoomName("")
  }

  return (
    <Box>
      <Box.Title>Create room</Box.Title>
      <Box.Content className="w-full flex items-center gap-2">
        <BaseInput 
          onChange={handleSetRoomName} 
          value={roomName}
          placeholder="Room name"
          className="w-[300px]"
        />
        <BaseButton 
          text="Create" 
          onClick={handleCreateRoomClick}
          disabled={!roomName}
        />
      </Box.Content>
    </Box>
  )
}