import ThemeService from '../services/ThemeService.js'

const themeController = {
    async getAll(req, res, next) {
        console.log(req)
        try {
            const themes = await ThemeService.getAll();
            res.status(200).json(themes);
        } catch (error) {
            // Manejo del error
            if (error.message === 'No themes found') {
                return res.status(404).json({ message: error.message });
            }

            next(error); // Propaga otros errores al middleware de manejo de errores
        }
    },
    async create(req, res, next) {
        try {
            const { name, permissions } = req.body;
            const theme = await ThemeService.create(name, permissions);
            res.status(201).json(theme);
        } catch (error) {
            next(error); // Propagar el error al middleware de gestión de errores
        }
    },
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const theme = await ThemeService.update(id, updates);
            res.json(theme);
        } catch (error) {
            next(error); // Propagar el error al middleware de gestión de errores
        }
    }
}

export default themeController
