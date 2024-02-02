import { IServer } from "../server/IServer";
import { IUser } from "../user/IUser";

export interface IMember {
  id: string;
  userId: string;
  serverId: string;
  isOwner: boolean;
  user: IUser;
}

export interface IMemberIncludeDTO extends IMember {
  servers: IServer[] | [];
}
