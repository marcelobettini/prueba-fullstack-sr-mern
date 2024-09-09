import Category from '../models/Category.js';

class CategoryService {
    static async create(name, type, coverImage) {
        // Validar que la categoría no exista ya
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw new Error('Category already exists');
        }

        // Crear y guardar la nueva categoría
        try {
            const category = new Category({ name, type, coverImage });
            return await category.save();
        } catch (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }

    static async getAll() {
        try {
            const categories = await Category.find({});
            return categories;
        } catch (error) {
            throw new Error(`Error retrieving categories: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const category = await Category.findById(id);
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error) {
            throw new Error(`Error retrieving category by ID: ${error.message}`);
        }
    }

    static async update(id, updates) {
        try {
            const category = await Category.findByIdAndUpdate(id, updates, { new: true });
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }
}

export default CategoryService;
