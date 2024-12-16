import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: "sqlite",
    storage: "config/database.sqlite",
});

export default db;