import { Router } from "express";

export interface IRouter {
    router: Router;
    init(): Router;
}