import { INewMessagesServer } from "../new_messages_server/INewMessagesServer";

export interface IChannel {
  id: string;
  name: string;
  serverId: string;
  userId: string;
  categoryId: string;
  new_messages_servers: INewMessagesServer[]
}