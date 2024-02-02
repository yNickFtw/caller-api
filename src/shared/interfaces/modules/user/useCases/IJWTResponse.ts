import { IUser } from "../IUser";

export interface IJWTResponse {
    userId: string;
    token: string;
    user: IUser
}