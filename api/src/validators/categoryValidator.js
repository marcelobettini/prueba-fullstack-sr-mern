import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string()
        .min(5, { message: "Name is required and must have 5 characters min" })
        .max(100, { message: "Name can't exceed 100 characters" }),
    type: z.enum(['image', 'video', 'document'], { message: "Type must be one of 'image', 'video', or 'document'" }),
    coverImage: z.string()
        .url({ message: "coverImage must be a valid URL" })
});

export const updateCategorySchema = createCategorySchema.partial();
