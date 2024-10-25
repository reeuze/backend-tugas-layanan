import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from './UserModels.js';

const {DataTypes} = Sequelize;

const Image = db.define("Image", {
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
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    }
},{
    freezeTableName:true
});

Image.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Image, { foreignKey: 'userId' });

export default Image;

(async()=>{
    await db.sync();
})();