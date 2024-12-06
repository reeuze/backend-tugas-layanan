import { Sequelize } from "sequelize";

// const db = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: "mysql",
//         port: process.env.DB_PORT,
//     }
// );

const db = new Sequelize(
    "layanan_db",
    "root",
    "root",
    {
        host: "localhost",
        dialect: "mysql",
        port: "3306",
    }
);

export default db;