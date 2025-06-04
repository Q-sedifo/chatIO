import React from "react";

// Types
import { IRoom } from "@/entities/Room/model/type";

// Components
import { Room } from "@/entities/Room/ui/Room";
import { RoomSkeleton } from "@/entities/Room/ui/RoomSkeleton";
import Box from "@/shared/ui/Box";

// Icons
import { FaGlobeAmericas } from "react-icons/fa";

interface IRoomsProps {
  rooms: IRoom[] | undefined;
  isLoading: boolean;
}

export const Rooms: React.FC<IRoomsProps> = ({ rooms, isLoading }) => {
  return (<>
    <Box>
      <Box.Title className="justify-start">
        <FaGlobeAmericas/>
        Публічні
      </Box.Title>
    </Box>
    <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {isLoading && Array.from({ length: 12 }, (_, i) => (
        <RoomSkeleton key={i}/>
      ))}
      {rooms?.map((room: IRoom, index: number) => (
        <Room key={room.id + index} room={room} />
      ))}
    </div>
  </>)
}