export interface IAuthenticateUserUseCase {
    execute(email: string, password: string): Promise<IPromiseJWT>;
}
