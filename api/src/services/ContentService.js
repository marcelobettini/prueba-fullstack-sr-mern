import Content from '../models/Content.js';
import User from '../models/User.js'

class ContentService {
    static async create(title, type, url, theme, category, authorId) {
        // Verificar si el contenido ya existe
        const existingContent = await Content.findOne({ title, author: authorId });
        if (existingContent) {
            throw new Error('Content already exists');
        }

        // Obtener el usuario para extraer el username
        const user = await User.findById(authorId);
        if (!user) {
            throw new Error('Author not found');
        }

        // Crear el nuevo contenido con el username del autor
        const content = new Content({
            title,
            type,
            url,
            theme,
            category,
            author: authorId,  // Se establece el campo author basado en el usuario autenticado
            credits: user.username  // Se establece el campo credits basado en el username del autor
        });

        return await content.save();
    }

    static async getAll() {
        try {

            return Content.find({})
                .populate('theme', 'name')
                .populate('category', 'name')
                .populate('author', 'username');
        } catch (error) {
            throw new Error(`Error retrieving contents: ${error.message}`)
        }
    }

    static async getByType(type) {
        return Content.find({ type })
            .populate('theme', 'name')
            .populate('category', 'name')
            .populate('author', 'username');
    }

    static async getById(id) {
        try {
            const content = await Content.findById(id)
                .populate('theme', 'name')
                .populate('category', 'name')
                .populate('author', 'username');

            if (!content) {
                throw new Error('Content not found');
            }

            return content;
        } catch (error) {
            throw new Error(`Error retrieving content by ID: ${error.message}`);
        }
    }

    static async update(id, updates) {
        try {
            // Validar que el contenido exista antes de actualizar
            const content = await Content.findById(id);
            if (!content) {
                throw new Error('Content not found');
            }

            // Actualizar contenido
            const updatedContent = await Content.findByIdAndUpdate(id, updates, { new: true })
                .populate('theme', 'name')
                .populate('category', 'name')
                .populate('author', 'username');

            if (!updatedContent) {
                throw new Error('Content update failed');
            }

            return updatedContent;
        } catch (error) {
            throw new Error(`Error updating content: ${error.message}`);
        }
    }

    //este metodo tiene por objeto ordenar los resultados con el orden que solicitan las reglas de negocios, se mantiene el getAll para separar responsabilidades y no sobrecargar ese metodo si en algun momento se requiere un listado simple 
    static async getLibrary() {
        try {
            // Agrupar los contenidos por tipo y tema
            const contents = await Content.aggregate([
                {
                    $group: {
                        _id: { type: "$type", theme: "$theme" },
                        contents: {
                            $push: {
                                _id: "$_id",
                                title: "$title",
                                url: "$url",
                                credits: "$credits",
                                createdAt: "$createdAt"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "themes",
                        localField: "_id.theme",
                        foreignField: "_id",
                        as: "themeDetails"
                    }
                },
                {
                    $unwind: "$themeDetails"
                },
                {
                    $sort: { "_id.type": 1, "themeDetails.name": 1 }
                }
            ]);

            return contents;
        } catch (error) {
            throw new Error(`Error retrieving library contents: ${error.message}`);
        }
    }


}

export default ContentService;
