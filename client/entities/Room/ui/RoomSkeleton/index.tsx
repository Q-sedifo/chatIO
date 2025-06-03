import React from "react";

// Components
import Box from "@/shared/ui/Box";

export const RoomSkeleton: React.FC = () => {
  return (
    <Box>
      <Box.Content className="w-full flex flex-col gap-2 animate-pulse h-[230px] bg-[#292929] rounded-xl">
        <></>
      </Box.Content>
    </Box>
  )
}