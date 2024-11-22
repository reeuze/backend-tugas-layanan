// import upload from "../config/multerConfig.js";

import User from '../models/UserModels.js';
import Image from '../models/ImageModels.js';
import user from '../models/UserModels.js';
// import Tag from '../models/TagModels.js';

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const stage_1 = await User.findOne({ 
            where: {
                email: email,
            }
        });

        if (!stage_1) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const stage_2 = await User.findOne({ 
            where: {
                password: password,
            }
        });

        if ( stage_1.userId !== stage_2.userId ) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        else {
            return res.status(200).json({ id: stage_2.userId });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const SignupUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const check_email = await User.findOne({
            where: { 
                email: email
            }
        });

        if (check_email) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        
        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
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
                required: false,
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createUsers = async(req, res) =>{
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// export const createUsers = async(req, res) =>{
//     try {
//         const { name, email, password, imageId } = req.body;
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             ImageId: imageId
//         });
//         res.status(201).json({ message: 'User created', user });
//     } catch (error) {
//         console.log(error.message);
//     }
// }

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
        return res.status(500).json({ error: error.message });
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
        return res.status(500).json({ error: error.message });
    }
}
