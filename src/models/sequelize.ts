import { Sequelize } from "sequelize";

const sequelize = new Sequelize(String(process.env.DB_NAME), String(process.env.DB_USERNAME), process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres"
});

export default sequelize;