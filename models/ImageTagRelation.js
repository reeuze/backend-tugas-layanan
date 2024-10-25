import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Image from "./ImageModels.js";
import Tag from "../models/TagModels.js";

const {DataTypes} = Sequelize;

const ImageTag = db.define("ImageTag", {
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image,
            key: 'imageId'
        }
    },
    tagId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'tagId'
        }
    }
}, {
    freezeTableName: true
});

Image.belongsToMany(Tag, { through: Image, foreignKey: 'imageId' });
Tag.belongsToMany(Image, { through: Image, foreignKey: 'tagId' });

export default ImageTag;

(async()=>{
    await db.sync();
})();