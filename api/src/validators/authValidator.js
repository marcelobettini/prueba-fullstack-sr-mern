import { z } from 'zod'
export const registerSchema = z.object({
    username: z.string().min(1, 'Username is required').max(20, 'Username too long'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['reader', 'creator']).optional(), // Role es opcional cuando se produce el register
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});