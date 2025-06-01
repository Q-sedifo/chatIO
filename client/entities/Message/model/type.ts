export interface IMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: Date | string;
  info?: boolean;
}