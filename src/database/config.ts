import { Sequelize } from "sequelize";
require('dotenv').config();

const database_url = process.env.DATABASE_URL as string;
const database_user = process.env.DATABASE_USER as string;
const database_password = process.env.DATABASE_PASSWORD as string;
const database_name = process.env.DATABASE_NAME as string;

const database = new Sequelize(database_name, database_user, database_password, {
    host: database_url,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  });

export default database;