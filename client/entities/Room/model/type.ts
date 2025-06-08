// Types
import { IMessage } from "@/entities/Message/model/type";
import { IUser } from "@/entities/User/model/type";
import { IGoogleDriveVideo } from "@/entities/Video/model/type";

export interface IRoom {
  id: string;
  name: string;
  creator: IUser;
  messages: IMessage[];
  users: IUser[];
  isPrivate: boolean;
  video?: IGoogleDriveVideo;
}

export interface ICreateRoomRequest {
  success: boolean;
  newRoom: IRoom;
}