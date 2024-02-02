import { IJWTResponse } from "./IJWTResponse";

export interface ICreateUserUseCase {
    execute(username: string, email: string, password: string, confirmPassword: string): Promise<IJWTResponse>;
}
