import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import AuthenticateUserController from "../controllers/authenticate-user-controller";
import CreateUserController from "../controllers/create-user-controller";

export default class UserRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/authenticate', new AuthenticateUserController().execute);
        this.router.post('/create', new CreateUserController().execute);
        //@NewController
    }

    public init(): Router {
        return this.router;
    }
}