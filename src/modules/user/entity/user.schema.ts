import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const User = database.define('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    username: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(),
        allowNull: false,
        defaultValue: "ONLINE"
    },
    description: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    picture: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    pictureFilename: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    banner: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    bannerFilename: {
        type: DataTypes.STRING(),
        allowNull: true,
    }
})

export { User };