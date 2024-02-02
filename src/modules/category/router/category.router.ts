import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import FindAllCategoriesByServerIdController from "../controllers/find-all-categories-by-server-id-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";


export default class CategoryRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.get('/find/all/by/:serverId', new AuthGuardMiddleware().execute, new FindAllCategoriesByServerIdController().execute);
        //@NewController

    }

    public init(): Router {
        return this.router;
    }
}