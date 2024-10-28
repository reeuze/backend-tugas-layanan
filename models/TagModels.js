import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const tag = db.define("tag", {
    tagId : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true
});

export default tag;

(async()=>{
    await db.sync();
})();