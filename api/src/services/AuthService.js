import User from '../models/User.js';
import { registerSchema } from '../validators/authValidator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    static async register(userData) {
        const parsedData = registerSchema.parse(userData);

        const existingUser = await User.findOne({ email: parsedData.email });
        if (existingUser) {
            throw new Error('User already exists');
        }


        const newUser = new User({
            username: parsedData.username,
            email: parsedData.email,
            password: parsedData.password,
            role: parsedData.role || 'reader',
        });

        await newUser.save();
        return newUser;
    }

    static async login(email, password) {
        console.log(email)
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Email or Password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Email or Password')
        }

        const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        console.log(process.env.JWT_EXPIRATION)
        return { token, user };
    }
    static async createAdmingIfNotExists() {
        try {
            const existingAdmin = await User.findOne({ role: 'admin' });
            if (existingAdmin) {
                console.log('Admin user already exists')
                return
            }
            const admin = new User({
                username: 'admin',
                email: process.env.ADMIN_EMAIL || 'admin@example.com',
                password: process.env.ADMIN_PASSWORD || 'admin',
                role: 'admin',
            });
            await admin.save();
            console.log('Admin user created');
        } catch (error) {
            console.error('Admin user creation failed:', error.message)
            throw new Error('Admin user creation failed')
        }

    }
}


export default AuthService;
