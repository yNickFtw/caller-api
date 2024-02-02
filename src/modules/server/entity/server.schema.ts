import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Server = database.define('server', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    picture: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    pictureFilename: {
        type: DataTypes.STRING(),
        allowNull: false,
    }
})

export { Server };