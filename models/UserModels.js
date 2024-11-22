import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const user = db.define("user", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthdate : {
        type: DataTypes.DATE,
        allowNull: true,
    },
    gender : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url_profile : {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    freezeTableName:true
});

export default user;

(async()=>{
    await db.sync();
})();
