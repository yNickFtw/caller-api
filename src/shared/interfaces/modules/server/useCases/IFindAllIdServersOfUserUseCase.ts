export interface IFindAllIdServersOfUserUseCase {
    execute(token: string): Promise<string[] | []>;
}
