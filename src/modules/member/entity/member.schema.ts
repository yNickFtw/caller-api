import { DataTypes } from 'sequelize'
import database from "../../../database/config";
import { UUIDV4 } from 'sequelize';

const Member = database.define('member', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    isOwner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export { Member };