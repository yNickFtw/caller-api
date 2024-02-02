import { IMember } from "../IMember";

export interface IFindAllMembersOfServerUseCase {
    execute(token: string, serverId: string): Promise<IMember[] | []>;
}
