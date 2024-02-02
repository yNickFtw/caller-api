import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Message = database.define('message', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    text: {
        type: DataTypes.STRING(),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(),
        allowNull: true
    },
    imageFilename: {
        type: DataTypes.STRING(),
        allowNull: true
    },
})

export { Message };