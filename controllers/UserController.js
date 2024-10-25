// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// import upload from "../config/multerConfig.js";

import User from '../models/UserModels.js';
import Image from '../models/ImageModels.js';
// import Tag from '../models/TagModels.js';

// export const LoginUser = async(req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Password is incorrect' });
//         }
// 
//         const token = jwt.sign(
//             { userId: user.id, email: user.email }, // Payload token
//             'secret_key', // Ganti dengan secret key yang lebih aman
//             { expiresIn: '1h' } // Token berlaku selama 1 jam
//         );
// 
//         // Kirim response sukses dan token
//         res.status(200).json({
//             message: 'Login successful',
//             token: token,
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// }

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async(req, res) =>{
    try {
        const ID = req.params.id
        const response = await User.findOne({
            where:{
                userId: ID
            },
            include: [{
                model: Image,
                where: {userId: ID},
                attributes: ['imageId', 'name', 'path'],
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUsers = async(req, res) =>{
    try {
        const { name, email, password, imageId } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            ImageId: imageId
        });
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUsers = async(req, res) =>{
    try {
        const { name } = req.body;
        await User.update({name: name},{
            where:{
                userId: req.params.id
            }
        });
        res.status(200).json({msg: "User name Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUsers = async(req, res) =>{
    try {
        await User.destroy({
            where:{
                userId: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}