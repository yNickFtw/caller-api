import { IMember, IMemberIncludeDTO } from "../IMember";

export interface IMemberRepository {
    add(member: Partial<IMember>): Promise<void>;
    removeByUserIdAndServerId(userId: string, serverId: string): Promise<void>;
    findAllServers(userId: string): Promise<string[]>;
    findAllServerIdsByUserId(userId: string): Promise<string[]>;
    findByUserIdAndServerId(userId: string, serverId: string): Promise<IMember | null>;
    findAllMembersByServerId(serverId: string): Promise<IMember[] | []>
}