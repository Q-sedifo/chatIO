import { IMessage } from "@/entities/Message/model/type";

export interface IRoom {
  id: string;
  name: string;
  creator: string;
  messages: IMessage[];
}

export interface ICreateRoomRequest {
  success: boolean;
  newRoom: IRoom;
}