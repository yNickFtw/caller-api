export interface IFindAllByUserIdAndServerIdUseCase {
    execute(token: string, serverId: string): Promise<INewMessagesServer>;
}
