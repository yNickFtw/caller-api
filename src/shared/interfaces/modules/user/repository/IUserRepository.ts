import { IUser } from "../IUser";

export interface IUserRepository {
    create(user: Partial<IUser>): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
    update(user: Partial<IUser>, userId: string): Promise<void>;
}