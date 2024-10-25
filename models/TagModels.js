import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Image from "./ImageModels.js";

const {DataTypes} = Sequelize;

const Tag = db.define("Tag", {
    tagId : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image,
            key: 'imageId'
        }
    }
},{
    freezeTableName:true
});

// Image.hasMany(Tag, { foreignKey: 'imageId' });
// Tag.belongsTo(Image, { foreignKey: 'imageId' });

export default Tag;

(async()=>{
    await db.sync();
})();