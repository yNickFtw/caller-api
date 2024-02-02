import { Op, Sequelize } from "sequelize";
import { IServer } from "../../../shared/interfaces/modules/server/IServer";
import { IServerRepository } from "../../../shared/interfaces/modules/server/repository/IServerRepository";
import { Server } from "../entity/server.schema";
import { IServersDTO } from "../useCases/find-all-of-community-useCase";

export default class ServerRepository implements IServerRepository {
    public async create(server: Partial<IServer>): Promise<IServer> {
        const serverCreated = await Server.create({ ...server });

        return serverCreated as unknown as IServer;
    }

    public async findAllByUserId(userId: string): Promise<[] | IServer[]> {
        const servers = await Server.findAll({ where: { userId: userId }, order: [["createdAt", "DESC"]] });

        return servers as unknown as IServer[];
    }

    public async findAllWhereIdIn(serversId: string[]): Promise<IServer[] | []> {
        const servers = await Server.findAll({ where: { id: { [Op.in]: serversId } } });

        return servers as unknown as IServer[];
    }

    public async findAll(): Promise<IServersDTO[] | []> {
        const servers = await Server.findAll({
            attributes: {
                include: [[
                    Sequelize.literal('(SELECT COUNT(*) FROM members WHERE members.serverId = Server.id)'),
                    "membersCount"
                ]]
            },
            order: [["createdAt", "DESC"]]
        })

        return servers as unknown as IServersDTO[];
    }

    public async findById(serverId: string): Promise<IServer | null> {
        const server = await Server.findOne({ where: { id: serverId } });

        return server as unknown as IServer;
    }
}