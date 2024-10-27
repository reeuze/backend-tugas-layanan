import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import image from "./ImageModels.js";
import tag from "../models/TagModels.js";

const {DataTypes} = Sequelize;

const imagetag = db.define("ImageTag", {
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: image,
            key: 'imageId'
        }
    },
    tagId: {
        type: DataTypes.INTEGER,
        references: {
            model: tag,
            key: 'tagId'
        }
    }
}, {
    freezeTableName: true
});

image.belongsToMany(tag, { through: imagetag, foreignKey: 'imageId' });
tag.belongsToMany(image, { through: imagetag, foreignKey: 'tagId' });

export default imagetag;

(async()=>{
    await db.sync();
})();