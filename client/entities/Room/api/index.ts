import axios from "axios";

// Types
import { IRoom, ICreateRoomRequest } from "../model/type";

// Getting rooms
export const getRooms = async (): Promise<IRoom[]> => {
  const { data } = await axios.get("http://localhost:3001/rooms")
  return data
}

// Create room
export const createRoom = async (roomName: string): Promise<ICreateRoomRequest> => {
  const { data } = await axios.post("http://localhost:3001/rooms", { 
    name: roomName 
  })

  return data
}