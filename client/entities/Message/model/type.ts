// Types
import { IUser } from "@/entities/User/model/type";

export interface IMessage {
  id?: string;
  text: string;
  sender?: IUser;
  timestamp?: Date | string;
  info?: boolean;
}