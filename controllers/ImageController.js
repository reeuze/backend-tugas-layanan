import Image from '../models/ImageModels.js';
import Tag from "../models/TagModels.js";
import ImageTag from '../models/ImageTagRelation.js';
import User from '../models/UserModels.js';
import Upload from '../multerConfig.js';

import fs from 'fs';
import path from 'path';

export const getImages = async(req, res) => {
    try {
        const response = await Image.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getImagesById = async(req, res) =>{
    try {
        const ID = req.params.id

        const image = await Image.findOne({
            where: {
                imageId: ID
            }
        });

        const tags = await ImageTag.findAll({
            where: {
                imageId: ID
            },
            attributes: ['tagId']
        });

        const tagIds = tags.map(tag => tag.tagId);

        const tagDetails = await Tag.findAll({
            where: {
                tagId: tagIds
            }
        });

        res.status(200).json({ 
            image: {
                ...image.toJSON(),
                tags: tagDetails
            }, 
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const createImages = async(req, res) => {
    try {
        const newImage = await Image.create(req.body);
        const filePath = req.file.path;
        const imageId = newImage.imageId;
        const newFileName = `${imageId}${path.extname(req.file.originalname)}`;
        const newFilePath = path.join('./Uploads', newFileName);
        fs.renameSync(filePath, newFilePath);
        await newImage.update({ path: newFilePath });
        res.status(200).json(newImage);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateImages = async(req, res) => {
    try {
        const UpdateImage = await Image.update(req.body,{
            where:{
                imageId: req.params.id
            }
        });
        res.status(200).json({msg: "Image Updated"});
    } catch (error) {
        
    }
}

export const deleteImages = async(req, res) => {
    try {
        await Image.destroy({
            where:{
                imageId: req.params.id
            }
        });
        res.status(200).json({msg: "Image Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}