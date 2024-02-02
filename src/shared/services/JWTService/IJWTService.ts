import { JwtPayload } from "jsonwebtoken";

export interface IJWTService {
    JWT_SECRET: string;
    generateToken(payload: {}, expIn: string): string
    decodeToken(token: string, isBearer: boolean): JwtPayload
}

