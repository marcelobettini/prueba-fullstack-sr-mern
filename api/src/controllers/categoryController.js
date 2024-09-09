import CategoryService from '../services/CategoryService.js';

const categoryController = {
    // Crear una nueva categoría
    async create(req, res) {
        try {
            const { name, type, coverImage } = req.body;
            const category = await CategoryService.create(name, type, coverImage);
            res.status(201).json({ message: 'Category created', category });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Obtener todas las categorías
    async getAll(req, res) {
        try {
            const categories = await CategoryService.getAll();
            if (categories.length) {
                res.status(200).json(categories);
            } else {
                res.status(404).json({ message: 'Categories not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch categories' });
        }
    },

    // Obtener una categoría por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.getById(id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch category' });
        }
    },

    // Actualizar una categoría por ID
    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const category = await CategoryService.update(id, updates);
            if (category) {
                res.status(200).json({ message: 'Category updated', category });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Eliminar una categoría por ID
    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryService.delete(id);
            if (result) {
                res.status(200).json({ message: 'Category deleted' });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete category' });
        }
    }
};

export default categoryController;
