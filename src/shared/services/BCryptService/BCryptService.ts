import { IBCryptService } from './IBCryptService';
import bcrypt from 'bcryptjs';

export default class BCryptService implements IBCryptService {
    public async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        return passwordHash;
    }

    public async comparePassword(password: string, passwordHash: string): Promise<boolean> {
        const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

        return passwordMatch;
    }
}
