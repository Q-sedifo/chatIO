// Types
import { IMessage } from "@/entities/Message/model/type";
import { IUser } from "@/entities/User/model/type";

export interface IRoom {
  id: string;
  name: string;
  creator: string;
  messages: IMessage[];
  users: IUser[];
  isPrivate: boolean;
}

export interface ICreateRoomRequest {
  success: boolean;
  newRoom: IRoom;
}