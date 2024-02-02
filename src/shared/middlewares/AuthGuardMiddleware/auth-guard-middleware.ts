import { Request, Response, NextFunction } from "express";
import { IAuthGuardMiddleware } from "../../interfaces/middlewares/IAuthGuardMiddleware";
import { TokenExpiredError } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
require('dotenv').config()

export default class AuthGuardMiddleware implements IAuthGuardMiddleware {
    constructor() {}

    execute(req: Request, res: Response, next: NextFunction): Response | void {
        try {
            const token = req.headers["authorization"] as string;

            if (!token) {
                return res.status(401).json({ message: "Sessão expirada, faça login novamente!" });
            }

            const secret = process.env.JWT_SECRET as string;

            const tokenParts = token.split("Bearer ")

            const decoded = jwt.verify(tokenParts[1], secret)

            if(!decoded) {
                return res.status(401).json({ message: "Sessão expirada, faça login novamente!" });
            }

            next();
        } catch (error: any) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ message: "Sessão expirada, faça login novamente!" });
            } else {
                return res.status(401).json({ message: "Sessão expirada, faça login novamente!", error: error.message });
            }
        }
    }
}
