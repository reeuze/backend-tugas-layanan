import Tag from "../models/TagModels.js";
// import ImageTag from '../models/ImageTagRelation.js';

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
        const response = await Tag.findOne({
            where:{
                tagId: req.params.id
            }
        });
        res.status(200).json(response);
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