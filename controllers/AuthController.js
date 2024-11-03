import bcrypt from 'bcrypt';
import User from '../models/UserModels.js';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Cek email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash passnya
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.userId,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Cek apakah email terdaftar
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            'secret_key', // Gantilah dengan kunci rahasia yang aman
            { expiresIn: '1h' }
        );

        // Kirim respons sukses dengan token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.userId,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

