import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import user from './UserModels.js';

const {DataTypes} = Sequelize;

const image = db.define("image", {
    imageId : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: true
    },
    path : {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'userId'
        }
    }
},{
    freezeTableName:true
});

image.belongsTo(user, { foreignKey: 'userId' });
user.hasMany(image, { foreignKey: 'userId' });

export default image;

(async()=>{
    await db.sync();
})();