export interface IAddMemberByServerIdUseCase {
    execute(token: string, serverId: string): Promise<IServer>;
}
