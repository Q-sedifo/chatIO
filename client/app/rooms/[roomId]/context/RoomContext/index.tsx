import { useState, createContext, useContext } from "react";

// Types
import { IRoom } from "@/entities/Room/model/type";

interface IRoomContext {
  room: IRoom | null;
  setRoom: (room: IRoom) => void;
}

const RoomContext = createContext<IRoomContext>({
  room: null,
  setRoom: () => false
})

export const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<IRoom | null>(null)

  console.log("room", room)

  const handleSetRoom = (room: IRoom) => {
    setRoom(room)
  }

  const contextValue = {
    room,
    setRoom: handleSetRoom
  }

  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  )
}

export const useRoom = () => useContext(RoomContext)