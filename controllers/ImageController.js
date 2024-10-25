import Image from '../models/ImageModels.js';
import Tag from "../models/TagModels.js";

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
        const response = await Image.findOne({
            where:{
                imageId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createImages = async(req, res) => {
    try {
        const newImage = await Image.create(req.body);
        res.status(200).json(newImage);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateImages = async(req, res) => {
    try {
        await Image.update(req.body,{
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