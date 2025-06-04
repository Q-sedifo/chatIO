"use client"
import React from "react";

// Context
import { RoomContextProvider } from "../../context/RoomContext";

interface IRoomProviderProps {
  children: React.ReactNode;
}

export const RoomProvider: React.FC<IRoomProviderProps> = ({ children }) => {
  return (
    <RoomContextProvider>
      { children }
    </RoomContextProvider>
  )
}