import Theme from '../models/Theme.js';

class ThemeService {
    static async getAll() {
        try {
            const themes = await Theme.find({});
            if (!themes.length) throw new Error("No themes found")
            return themes
        } catch (error) {
            throw new Error(`Error retrieving themes: ${error.message}`);
        }
    }
    static async create(name, permissions) {
        try {
            // Verificar si la temática ya existe
            const existingTheme = await Theme.findOne({ name });
            if (existingTheme) {
                throw new Error('Theme already exists');
            }

            // Crear nueva temática
            const theme = new Theme({ name, permissions });
            return await theme.save();
        } catch (error) {
            throw new Error(`Error creating theme: ${error.message}`);
        }
    }

    static async update(id, updates) {
        try {
            // Actualizar temática
            const theme = await Theme.findByIdAndUpdate(id, updates, { new: true });
            if (!theme) {
                throw new Error('Theme not found');
            }
            return theme;
        } catch (error) {
            throw new Error(`Error updating theme: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            // Eliminar temática
            const theme = await Theme.findByIdAndDelete(id);
            if (!theme) {
                throw new Error('Theme not found');
            }
            return theme;
        } catch (error) {
            throw new Error(`Error deleting theme: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const theme = await Theme.findById(id);
            if (!theme) {
                throw new Error('Theme not found');
            }
            return theme;
        } catch (error) {
            throw new Error(`Error retrieving theme by ID: ${error.message}`);
        }
    }
}

export default ThemeService;