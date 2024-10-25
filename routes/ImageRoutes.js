import express from "express";
import {
    getImages,
    getImagesById,
    createImages,
    updateImages,
    deleteImages
} from "../controllers/ImageController.js";

const router = express.Router();

router.get('/images', getImages);
router.get('/images/:id', getImagesById);
router.post('/images', createImages);
router.patch('/images/:id', updateImages);
router.delete('/images/:id', deleteImages);

export default router;