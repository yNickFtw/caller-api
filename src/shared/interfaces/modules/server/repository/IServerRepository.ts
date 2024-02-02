import { IServersDTO } from "../../../../../modules/server/useCases/find-all-of-community-useCase";
import { IServer } from "../IServer";

export interface IServerRepository {
    create(server: Partial<IServer>): Promise<IServer>;
    findAllByUserId(userId: string): Promise<IServer[] | []>;
    findAllWhereIdIn(serversId: string[]): Promise<IServer[] | []>;
    findAll(): Promise<IServersDTO[] | []>;
    findById(serverId: string): Promise<IServer | null>;
}