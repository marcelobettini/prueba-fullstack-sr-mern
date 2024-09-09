import AuthService from '../services/AuthService.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js'




const authController = {

    async register(req, res, next) {
        try {
            // Validar los datos del registro
            registerSchema.parse(req.body);
            const user = await AuthService.register(req.body);
            res.status(201).json({ message: 'User registered', user });
        } catch (error) {
            next(error);
        }
    },


    async login(req, res, next) {
        try {
            loginSchema.parse(req.body);
            const { email, password } = req.body;
            const { token, user } = await AuthService.login(email, password);
            res.status(200).json({ token, user });
        } catch (error) {
            next(error)
        }
    }
}
export default authController