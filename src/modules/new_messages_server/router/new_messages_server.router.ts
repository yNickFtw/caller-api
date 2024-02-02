import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import SendMessageController from "../controllers/send-message-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import FindAllByUserIdAndServerIdController from "../controllers/find-all-by-user-id-and-server-id-controller";


export default class NewMessagesServerRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/send/message/:channelId/:serverId', new AuthGuardMiddleware().execute, new SendMessageController().execute);
        this.router.get('/find/all/:serverId', new AuthGuardMiddleware().execute, new FindAllByUserIdAndServerIdController().execute);
        //@NewController


    }

    public init(): Router {
        return this.router;
    }
}