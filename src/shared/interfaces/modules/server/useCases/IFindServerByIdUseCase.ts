export interface IFindServerByIdUseCase {
    execute(token: string, serverId: string): Promise<IServer | null>;
}
