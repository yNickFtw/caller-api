import { Router } from "express";
import { IRouter } from "../interfaces/globals/IRouter";
import { container } from "tsyringe";
import UserRouter from "../../modules/user/router/user.router";
import ServerRouter from "../../modules/server/router/server.router";
import MemberRouter from "../../modules/member/router/member.router";
import ChannelRouter from "../../modules/channel/router/channel.router";
import CategoryRouter from "../../modules/category/router/category.router";
import MessageRouter from "../../modules/message/router/message.router";
import NewMessagesServerRouter from "../../modules/new_messages_server/router/new_messages_server.router";
//@ImportRouter

export default class MainRouter implements IRouter {
    router: Router;

    constructor(
        private serverRouter = container.resolve<IRouter>(ServerRouter),
        private memberRouter = container.resolve<IRouter>(MemberRouter),
        private channelRouter = container.resolve<IRouter>(ChannelRouter),
        private categoryRouter = container.resolve<IRouter>(CategoryRouter),
        private messageRouter = container.resolve<IRouter>(MessageRouter),
        private new_messages_serverRouter = container.resolve<IRouter>(NewMessagesServerRouter),
        //@InstanceRouter
        private userRouter = container.resolve<IRouter>(UserRouter),
    ) {
        this.router = Router();
        this.router.use('/users', this.userRouter.init());
        this.router.use('/servers', this.serverRouter.init());
        this.router.use('/members', this.memberRouter.init());
        this.router.use('/channels', this.channelRouter.init());
        this.router.use('/categories', this.categoryRouter.init());
        this.router.use('/messages', this.messageRouter.init());
        this.router.use('/new_messages_servers', this.new_messages_serverRouter.init());
        //@NewInitInstance

    }

    init(): Router {
        return this.router;
    }

}

