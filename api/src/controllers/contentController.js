import ContentService from '../services/ContentService.js';

const contentController = {
    async create(req, res) {
        const { title, type, url, theme, category } = req.body;
        const authorId = req.user._id;
        console.log("Author ID")
        console.log(authorId)
        try {
            const content = await ContentService.create(title, type, url, theme, category, authorId);
            res.status(201).json(content);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAll(req, res) {
        const userRole = req.user.role;
        try {
            let contents;
            if (userRole === 'creator') {
                contents = await ContentService.getAll();

            } else if (userRole === 'reader') {
                contents = await ContentService.getByType('text')
            } else {
                // Si no está autenticado o tiene un rol desconocido
                return res.status(403).json({ message: 'Access denied' });
            }
            if (contents.length) {
                res.status(200).json(contents);
            } else {
                res.status(404).json({ message: 'Content not found' });
            }
        } catch (error) {
            console.error('Get all contents error:', error);
            res.status(400).json({ message: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const content = await ContentService.getById(id);
            if (!content) {
                return res.status(404).json({ message: 'Content not found' });
            }
            res.status(200).json(content);
        } catch (error) {
            console.error('Get content by ID error:', error);
            res.status(400).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedContent = await ContentService.update(id, updates);
            if (!updatedContent) {
                return res.status(404).json({ message: 'Content not found' });
            }
            res.status(200).json(updatedContent);
        } catch (error) {
            console.error('Update content error:', error);
            res.status(400).json({ message: error.message });
        }
    },

    //este metodo tiene por objeto ordenar los resultados con el orden que solicitan las reglas de negocios, se mantiene el getAll para separar responsabilidades y no sobrecargar ese metodo si en algun momento se requiere un listado simple 
    async getLibrary(req, res) {
        try {
            const library = await ContentService.getLibrary();
            if (library.length) {
                res.status(200).json(library);
            } else {
                res.status(404).json({ message: 'No contents found in the library' });
            }
        } catch (error) {
            console.error('Get library error:', error);
            res.status(400).json({ message: error.message });
        }
    }
};

export default contentController;
