import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Channel = database.define('channel', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false
    },
})

export { Channel };