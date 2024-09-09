import { ZodError } from 'zod';
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map(err => ({
                path: err.path.join('.'), //facilitamos un poco el debugging
                message: err.message
            }));
            return res.status(400).json({ message: 'Validation Error', errors: formattedErrors });
        }
        next(error);
    }
};