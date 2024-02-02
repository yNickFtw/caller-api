import { Category } from "../modules/category/entity/category.schema";
import { Channel } from "../modules/channel/entity/channel.schema";
import { Member } from "../modules/member/entity/member.schema";
import { Message } from "../modules/message/entity/message.schema";
import { NewMessagesServer } from "../modules/new_messages_server/entity/new_messages_server.schema";
import { Server } from "../modules/server/entity/server.schema";
import { User } from "../modules/user/entity/user.schema";

export default class AssociationConfig {
    public init(callback: Function): void {
        User.hasMany(Server);
        Server.belongsTo(User);

        User.hasMany(Member);
        Member.belongsTo(User);

        Server.hasMany(Member);
        Member.belongsTo(Server);

        User.hasMany(Category);
        Category.belongsTo(User);

        Server.hasMany(Category);
        Category.belongsTo(Server);

        User.hasMany(Channel);
        Channel.belongsTo(User);

        Server.hasMany(Channel);
        Channel.belongsTo(Server);

        Category.hasMany(Channel);
        Channel.belongsTo(Category);

        User.hasMany(Message);
        Message.belongsTo(User);

        Channel.hasMany(Message);
        Message.belongsTo(Channel);

        User.hasMany(NewMessagesServer);
        NewMessagesServer.belongsTo(User);

        Server.hasMany(NewMessagesServer);
        NewMessagesServer.belongsTo(Server);

        Channel.hasMany(NewMessagesServer);
        NewMessagesServer.belongsTo(Channel);

        callback();
    }
}