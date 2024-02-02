import { NextFunction, Request, Response } from "express";

export interface IAuthGuardMiddleware {
    execute(req: Request, res: Response, next: NextFunction): void
}