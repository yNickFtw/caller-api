import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import CreateServerController from "../controllers/create-server-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import { upload } from "../../../shared/middlewares/MulterMiddleware/multer-middleware";
import FindAllServersOfUserController from "../controllers/find-all-servers-of-user-controller";
import FindAllOfCommunityController from "../controllers/find-all-of-community-controller";
import FindAllIdServersOfUserController from "../controllers/find-all-id-servers-of-user-controller";
import FindServerByIdController from "../controllers/find-server-by-id-controller";


export default class ServerRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/create', new AuthGuardMiddleware().execute, upload.single('file'), new CreateServerController().execute);
        this.router.get('/find/all/user', new AuthGuardMiddleware().execute, new FindAllServersOfUserController().execute);
        this.router.get('/find/all/community', new AuthGuardMiddleware().execute, new FindAllOfCommunityController().execute);
        this.router.get('/find/all/servers/id', new AuthGuardMiddleware().execute, new FindAllIdServersOfUserController().execute);
        this.router.get('/find/by/id/:serverId', new AuthGuardMiddleware().execute, new FindServerByIdController().execute);
        //@NewController


    }

    public init(): Router {
        return this.router;
    }
}