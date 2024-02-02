import { IRouter } from "../../../shared/interfaces/globals/IRouter";
import { Router } from "express";
import AddMemberByServerIdController from "../controllers/add-member-by-server-id-controller";
import AuthGuardMiddleware from "../../../shared/middlewares/AuthGuardMiddleware/auth-guard-middleware";
import LeaveServerByIdController from "../controllers/leave-server-by-id-controller";
import FindAllMembersOfServerController from "../controllers/find-all-members-of-server-controller";


export default class MemberRouter implements IRouter {
    router: Router;

    constructor() {
        this.router = Router()
        this.router.post('/add/to/server', new AuthGuardMiddleware().execute, new AddMemberByServerIdController().execute);
        this.router.delete('/leave/server', new AuthGuardMiddleware().execute, new LeaveServerByIdController().execute);
        this.router.get('/find/all/:serverId', new AuthGuardMiddleware().execute, new FindAllMembersOfServerController().execute);
    //@NewController
    

    }

    public init(): Router {
        return this.router;
    }
}