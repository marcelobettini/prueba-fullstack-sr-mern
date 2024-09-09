import { z } from 'zod';

// Esquema para crear contenido
export const createContentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(['image', 'video', 'text'], "Invalid content type"),
    url: z.string().url("URL must be valid").min(1, "URL is required"),
    theme: z.string().length(24, "Theme ID must be a valid ObjectId"),
    category: z.string().length(24, "Category ID must be a valid ObjectId"),
});

// Esquema para actualizar contenido
export const updateContentSchema = createContentSchema.partial();
