import express from "express";
import {
    getTags,
    getTagsById,
    createTags
} from "../controllers/TagsController.js";

const router = express.Router();

router.get('/tags', getTags);
router.get('/tags/:id', getTagsById);
router.post('/tags', createTags);

export default router;