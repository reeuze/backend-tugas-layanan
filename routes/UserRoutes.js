import express from "express";
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUsers);
router.patch('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);

export default router;