import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import SendMessageToServerController from "../controllers/send-message-to-server-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import { upload } from "../../../shared/middlewares/MulterMiddleware/multer-middleware";
import FindAllMessagesByChannelIdController from "../controllers/find-all-messages-by-channel-id-controller";


export default class MessageRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/send/message/:channelId', new AuthGuardMiddleware().execute, upload.single('file'), new SendMessageToServerController().execute);
        this.router.get('/find/all/channel/:channelId/:serverId', new AuthGuardMiddleware().execute, new FindAllMessagesByChannelIdController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}