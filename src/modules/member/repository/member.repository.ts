import { IMember, IMemberIncludeDTO } from "../../../shared/interfaces/modules/member/IMember";
import { IMemberRepository } from "../../../shared/interfaces/modules/member/repository/IMemberRepository";
import { User } from "../../user/entity/user.schema";
import { Member } from "../entity/member.schema";

export default class MemberRepository implements IMemberRepository {
    public async add(member: Partial<IMember>): Promise<void> {
        await Member.create({ ...member });

        return;
    }

    public async removeByUserIdAndServerId(userId: string, serverId: string): Promise<void> {
        await Member.destroy({ where: { userId: userId, serverId: serverId } });

        return;
    }

    public async findAllServers(userId: string): Promise<string[] | []> {
        const members = await Member.findAll({ where: { userId: userId } });

        const serversId: string[] = members.map((member: any) => member.serverId);

        return serversId;
    }

    public async findAllServerIdsByUserId(userId: string): Promise<string[]> {
        const serversIds = await Member.findAll({ where: { userId }, attributes: ["id"] });

        return serversIds as unknown as string[]
    }

    public async findByUserIdAndServerId(userId: string, serverId: string): Promise<IMember | null> {
        const member = await Member.findOne({ where: { userId, serverId } });

        return member as unknown as IMember;
    }

    public async findAllMembersByServerId(serverId: string): Promise<IMember[] | []> {
        const members = await Member.findAll({ where: { serverId }, include: [{ model: User, attributes: { exclude: ["password"] } }], order: [["createdAt", "ASC"]] });

        return members as unknown as IMember[];
    }
}