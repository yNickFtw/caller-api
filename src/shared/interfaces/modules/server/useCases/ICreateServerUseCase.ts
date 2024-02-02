import { IServer } from "../IServer";

export interface ICreateServerUseCase {
    execute(token: string, file: any, name: string): Promise<IServer>;
}
