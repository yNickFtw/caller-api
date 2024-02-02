import { container } from "tsyringe";
import { IRouter } from "../interfaces/globals/IRouter";
// @Imports
import { IUserRepository } from '../interfaces/modules/user/repository/IUserRepository'
import UserRepository from '../../modules/user/repository/user.repository'
import { IServerRepository } from '../interfaces/modules/server/repository/IServerRepository'
import ServerRepository from '../../modules/server/repository/server.repository'
import { IMemberRepository } from '../interfaces/modules/member/repository/IMemberRepository'
import MemberRepository from '../../modules/member/repository/member.repository'
import { IChannelRepository } from '../interfaces/modules/channel/repository/IChannelRepository'
import ChannelRepository from '../../modules/channel/repository/channel.repository'
import { ICategoryRepository } from '../interfaces/modules/category/repository/ICategoryRepository'
import CategoryRepository from '../../modules/category/repository/category.repository'
import { IMessageRepository } from '../interfaces/modules/message/repository/IMessageRepository'
import MessageRepository from '../../modules/message/repository/message.repository'
import { INewMessagesServerRepository } from '../interfaces/modules/new_messages_server/repository/INewMessagesRepository'
import NewMessagesServerRepository from '../../modules/new_messages_server/repository/new_messages_server.repository'
//@ImportInjection

// @Import Routes

import UserRouter from '../../modules/user/router/user.router'
import ServerRouter from '../../modules/server/router/server.router'
import { IJWTService } from "../services/JWTService/IJWTService";
import JWTService from "../services/JWTService/JWTService";
import { IBCryptService } from "../services/BCryptService/IBCryptService";
import BCryptService from "../services/BCryptService/BCryptService";
import { IFirebaseService } from "../services/FirebaseService/IFirebaseService";
import FirebaseService from "../services/FirebaseService/FirebaseService";
import MemberRouter from '../../modules/member/router/member.router'
import ChannelRouter from '../../modules/channel/router/channel.router'
import CategoryRouter from '../../modules/category/router/category.router'
import MessageRouter from '../../modules/message/router/message.router'
import NewMessagesServerRouter from '../../modules/new_messages_server/router/new_messages_server.router'
//@ImportRouter

//@ImportService

// @Repositories


container.register<IUserRepository>(
  "UserRepository",
  UserRepository
)

container.register<IServerRepository>(
  "ServerRepository",
  ServerRepository
)

container.register<IMemberRepository>(
  "MemberRepository",
  MemberRepository
)

container.register<IChannelRepository>(
  "ChannelRepository",
  ChannelRepository
)

container.register<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
)

container.register<IMessageRepository>(
  "MessageRepository",
  MessageRepository
)

container.register<INewMessagesServerRepository>(
  "NewMessagesServerRepository",
  NewMessagesServerRepository
)
//@InjectionDependecy

// @Routers


container.register<IRouter>(
  "UserRouter",
  UserRouter
)

container.register<IRouter>(
  "ServerRouter",
  ServerRouter
)

container.register<IRouter>(
  "MemberRouter",
  MemberRouter
)

container.register<IRouter>(
  "ChannelRouter",
  ChannelRouter
)

container.register<IRouter>(
  "CategoryRouter",
  CategoryRouter
)

container.register<IRouter>(
  "MessageRouter",
  MessageRouter
)

container.register<IRouter>(
  "NewMessagesServerRouter",
  NewMessagesServerRouter
)
//@RouterInjection

// @Services

container.register<IJWTService>(
  "JWTService",
  JWTService
)

container.register<IBCryptService>(
  "BCryptService",
  BCryptService
)

container.register<IFirebaseService>(
  "FirebaseService",
  FirebaseService
)

//@NewService

