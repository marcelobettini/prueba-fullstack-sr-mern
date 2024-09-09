import rateLimit from 'express-rate-limit';

const rateLimitConfig = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min.
    max: 100, // Límite de 100 solicitudes por IP por ventana
    message: 'Too many requests from this IP, please try again later.',
});

export default rateLimitConfig;