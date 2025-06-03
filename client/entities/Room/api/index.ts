import { serverApi } from "@/shared/api/serverApi";

// Types
import { IRoom, ICreateRoomRequest } from "../model/type";

// Getting rooms
export const getRooms = async (): Promise<IRoom[]> => {
  const { data } = await serverApi.get("/rooms")
  return data
}

// Create room
export const createRoom = async (): Promise<ICreateRoomRequest> => {
  const { data } = await serverApi.post("/rooms")
  return data
}