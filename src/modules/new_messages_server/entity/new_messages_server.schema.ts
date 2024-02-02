import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const NewMessagesServer = database.define('new_messages_server', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
})

export { NewMessagesServer };