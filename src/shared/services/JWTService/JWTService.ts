import { IJWTService } from './IJWTService';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'

require('dotenv').config();

export default class JWTService implements IJWTService {
    JWT_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET as string;
    }

    public generateToken(payload: {}, expIn: string): string {
        return jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: expIn
        });
    }

    public decodeToken(token: string, isBearer: boolean): JwtPayload {
        try {
            if(isBearer) {
                const tokenParts = token.split('Bearer ')
    
                token = tokenParts[1];
            }
            
            const decoded = jwt.verify(token, this.JWT_SECRET)
    
            return decoded as JwtPayload;
        } catch (error: any) {
            throw error;
        }
    }

}
