export interface IBCryptService {
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, passwordHash: string): Promise<boolean>
}