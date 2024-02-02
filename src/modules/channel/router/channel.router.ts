import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateChannelByServerIdController from "../controllers/create-channel-by-server-id-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";


export default class ChannelRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create/:serverId/:categoryId', new AuthGuardMiddleware().execute, new CreateChannelByServerIdController().execute);
        //@NewController
    }

    public init(): Router {
        return this.router;
    }
}