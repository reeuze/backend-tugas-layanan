import Tag from "../models/TagModels.js";
import Image from '../models/ImageModels.js';
import ImageTag from '../models/ImageTagRelation.js';

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getTagsById = async(req, res) =>{
    try {
        const ID = req.params.id

        const tag = await Tag.findOne({
            where:{
                tagId: ID
            }
        });

        const images = await ImageTag.findAll({
            where: {
                tagId: ID
            },
            attributes: ['imageId']
        });

        const imageIds = images.map(image => image.imageId);

        const imageDetails = await Image.findAll({
            where: {
                imageId: imageIds
            }
        });

        res.status(200).json({ 
            tag: tag.toJSON(), 
            images: imageDetails
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const createTags = async(req, res) => {
    try {
        const newTag = await Tag.create(req.body);
        res.status(200).json(newTag);
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTags = async(req, res) => {
    try {
        await Tag.destroy({
            where:{
                tagId: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}