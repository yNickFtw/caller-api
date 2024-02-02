export interface ILeaveServerByIdUseCase {
    execute(token: string, serverId: string): Promise<void>;
}
