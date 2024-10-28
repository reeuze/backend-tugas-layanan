import express from "express";
import {
    getTags,
    getTagsById,
    createTags,
    deleteTags
} from "../controllers/TagsController.js";

const router = express.Router();

router.get('/tags', getTags);
router.get('/tags/:id', getTagsById);
router.post('/tags', createTags);
router.delete('/tags/:id', deleteTags);

export default router;