import express from "express";
import {
    getImages,
    getImagesById,
    createImages,
    updateImages,
    deleteImages
} from "../controllers/ImageController.js";
import upload from "../multerConfig.js";

const router = express.Router();

router.get('/images', getImages);
router.get('/images/:id', getImagesById);
router.post('/images', upload.single('file'), createImages);
router.patch('/images/:id', updateImages);
router.delete('/images/:id', deleteImages);

export default router;