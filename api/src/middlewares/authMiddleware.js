import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwtConfig.js';
import User from '../models/User.js';

// Middleware para autenticar el JWT
export const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded || !decoded.sub) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        // Buscar al usuario en la base de datos
        const user = await User.findById(decoded.sub).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Establecer el usuario en req.user
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware para autorizar el rol
export const authorizeRole = (role) => (req, res, next) => {
    // Verificar si req.user está definido
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    // Verificar el rol del usuario
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
