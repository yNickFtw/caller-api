export interface IFindAllServersOfUserUseCase {
    execute(token: string): Promise<IServer[] | []>;
}
