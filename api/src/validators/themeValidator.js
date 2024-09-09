import { z } from 'zod';

export const createThemeSchema = z.object({
    name: z.string().min(4).max(34), //ajustar segun bussiness rules
    permissions: z.object({
        images: z.boolean().optional(),
        videos: z.boolean().optional(),
        texts: z.boolean().optional()
    })
});

export const updateThemeSchema = createThemeSchema.partial(); 
