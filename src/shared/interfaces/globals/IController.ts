import { Request, Response } from "express";

export interface IController {
    execute: (req: Request, res: Response) => Promise<Response>
}