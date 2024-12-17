import express from "express";
import {
    LoginUser,
    SignupUser,
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users/:id', createUsers);
router.patch('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);
router.post('/login', LoginUser);
router.post('/signup', SignupUser);

export default router;