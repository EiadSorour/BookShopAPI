import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bookshop2", String(process.env.DB_USERNAME), process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres"
});

export default sequelize;