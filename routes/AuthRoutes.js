import express from "express";
import { signUpUser, loginUser } from "../controllers/AuthController.js";

const router = express.Router();

// router.post('/signup', signUpUser); // rute untuk sign up
// router.post('/login', loginUser); // rute untuk login

export default router;
