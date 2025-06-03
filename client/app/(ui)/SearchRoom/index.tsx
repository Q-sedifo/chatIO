import React, { useState } from "react";

// Components
import { BaseInput } from "@/shared/ui/inputs/BaseInput";
import Box from "@/shared/ui/Box";

export const SearchRoom = () => {
  const [roomName, setRoomName] = useState<string>("")

  const handleSetRoomName = (name: string) => {
    setRoomName(() => name)
  }

  return (
    <Box>
      <Box.Title>Search room</Box.Title>
      <Box.Content className="w-full flex items-center gap-2">
        <BaseInput 
          onChange={handleSetRoomName} 
          value={roomName}
          placeholder="Room name"
          className="w-[300px]"
        />
      </Box.Content>
    </Box>
  )
}