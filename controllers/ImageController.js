import Image from '../models/ImageModels.js';
import Tag from "../models/TagModels.js";
import ImageTag from '../models/ImageTagRelation.js';

import { Op } from "sequelize";

import fs from 'fs';
import path from 'path';

export const viewImage = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.join('./Uploads', fileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200);
        res.sendFile(path.resolve(filePath));
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getImages = async(req, res) => {
    try {
        const images = await Image.findAll({
            attributes: ['imageId', 'name', 'description', 'path', 'userId'],
            include: [
                {
                    model: Tag,
                    attributes: ['tagId', 'name'],
                }
            ]
        });
        const response = images.map(image => {
            const imageData = image.toJSON();

            delete imageData.createdAt;
            delete imageData.updatedAt;
            
            imageData.imageUrl = `${req.protocol}://${req.get('host')}/view/${imageData.path}`;

            if (imageData.tags) {
                imageData.tags = imageData.tags.map(tag => {
                    const { ImageTag, ...filteredTag } = tag;
                    return filteredTag;
                });
            }

            return imageData;
        });
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
            ...image.toJSON(),
            imageUrl: `${req.protocol}://${req.get('host')}/view/${image.path}`,
            tags: tagDetails
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const uploadImages = async (req, res) => {
    try {

        const filePath = req.file.path;
        const newFileName = req.file.originalname;
        const newFilePath = path.join('./Uploads', newFileName);
        fs.renameSync(filePath, newFilePath);

        res.status(201).json({
            path: newFilePath
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });   
    }
}


export const createImages = async (req, res) => {
    let transaction; // Deklarasi transaksi di luar try

    try {
        console.log("Inside createImages");
        const { name, description, userId, tags, path } = req.body;
        console.log(req.body);

        // 1. Mulai transaksi
        transaction = await Image.sequelize.transaction();
        console.log("Starting transaction...");

        // 2. Buat New Image di dalam transaksi
        const Newimage = await Image.create(
            {
                name,
                description,
                userId,
                path
            },
            { transaction } // Sertakan transaksi
        );
        console.log("New image created:", Newimage);

        // 3. Tambahkan tags jika ada
        if (tags && Array.isArray(tags)) {
            const tagRelations = tags.map(tagId => ({
                imageId: Newimage.imageId, // Gunakan ID dari Newimage
                tagId,
            }));
            await ImageTag.bulkCreate(tagRelations, { transaction });
            console.log("Tags inserted:", tagRelations);
        }

        // 4. Commit transaksi
        await transaction.commit();
        console.log("Transaction committed.");

        // 5. Response berhasil
        res.status(200).json({
            name: Newimage.name,
            description: Newimage.description,
            userId: Newimage.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/view/${Newimage.path}`,
            tags: tags || []
        });

    } catch (error) {
        // Rollback jika transaksi ada
        if (transaction) {
            await transaction.rollback();
            console.error("Transaction rolled back.");
        }

        // Tampilkan error
        console.error("Error creating image:", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const updateImages = async(req, res) => {
    try {
        const ID = req.params.id
        const { name, description, path, tags } = req.body;
        const transaction = await Image.sequelize.transaction();

        const updateImage = await Image.update({name, description, path},{
            where:{
                imageId: ID
            },
            transaction
        });

        if (tags && Array.isArray(tags)) {
            await ImageTag.destroy({
                where: {
                    imageId: ID
                },
                transaction
            });

            const newTags = tags.map(tagId => ({
                imageId: ID,
                tagId
            }));
            await ImageTag.bulkCreate(newTags, {
                transaction
            });
        }

        await transaction.commit();
        res.status(200).json({msg: "Image Updated"});
    } catch (error) {
        await transaction.rollback();
        console.log(error.message);
    }
}

export const deleteImages = async (req, res) => {
    const transaction = await Image.sequelize.transaction();
    try {
        const ID = req.params.id;
        const image = await Image.findOne({ where: { imageId: ID } });

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        if (fs.existsSync("./Uploads/" + image.path)) {
            fs.unlinkSync("./Uploads/" + image.path);
        }

        await ImageTag.destroy({ where: { imageId: ID }, transaction });
        await Image.destroy({ where: { imageId: ID }, transaction });

        await transaction.commit();
        res.status(200).json({ message: "Image Deleted" });
    } catch (error) {
        await transaction.rollback();
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
