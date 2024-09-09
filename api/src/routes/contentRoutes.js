import { Router } from 'express';
import contentController from '../controllers/contentController.js';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware.js'; // Importar el middleware de autorización
import { validate } from '../middlewares/validateRequest.js';
import { createContentSchema, updateContentSchema } from '../validators/contentValidator.js';

const router = Router();
router.use(authenticateJWT)

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Endpoints para gestionar contenidos
 */

/**
 * @swagger
 * /contents:
 *   post:
 *     summary: Crea un nuevo contenido
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Content Title"
 *               type:
 *                 type: string
 *                 enum: ['image', 'video', 'text']
 *                 example: "image"
 *               url:
 *                 type: string
 *                 example: "http://example.com/newcontent.jpg"
 *               theme:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c84"
 *               author:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c83"
 *               credits:
 *                 type: string
 *                 example: "username"
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c82"
 *                 title:
 *                   type: string
 *                   example: "New Content Title"
 *                 type:
 *                   type: string
 *                   example: "image"
 *                 url:
 *                   type: string
 *                   example: "http://example.com/newcontent.jpg"
 *                 theme:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *                 category:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c84"
 *                 author:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c83"
 *                 credits:
 *                   type: string
 *                   example: "username"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: title is required"
 */

/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Obtiene todos los contenidos
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Lista de contenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c82"
 *                   title:
 *                     type: string
 *                     example: "Sample Content Title"
 *                   type:
 *                     type: string
 *                     example: "image"
 *                   url:
 *                     type: string
 *                     example: "http://example.com/samplecontent.jpg"
 *                   theme:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   category:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c84"
 *                   author:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c83"
 *                   credits:
 *                     type: string
 *                     example: "username"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

/**
 * @swagger
 * /contents/library:
 *   get:
 *     summary: Obtiene todos los contenidos de la biblioteca
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Lista de contenidos de la biblioteca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c82"
 *                   title:
 *                     type: string
 *                     example: "Sample Content Title"
 *                   type:
 *                     type: string
 *                     example: "image"
 *                   url:
 *                     type: string
 *                     example: "http://example.com/samplecontent.jpg"
 *                   theme:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   category:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c84"
 *                   author:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c83"
 *                   credits:
 *                     type: string
 *                     example: "username"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

/**
 * @swagger
 * /contents/{id}:
 *   get:
 *     summary: Obtiene un contenido por ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c82"
 *     responses:
 *       200:
 *         description: Contenido obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c82"
 *                 title:
 *                   type: string
 *                   example: "Sample Content Title"
 *                 type:
 *                   type: string
 *                   example: "image"
 *                 url:
 *                   type: string
 *                   example: "http://example.com/samplecontent.jpg"
 *                 theme:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *                 category:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c84"
 *                 author:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c83"
 *                 credits:
 *                   type: string
 *                   example: "username"
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Content not found"
 */

/**
 * @swagger
 * /contents/{id}:
 *   patch:
 *     summary: Actualiza un contenido existente
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c82"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Content Title"
 *               type:
 *                 type: string
 *                 enum: ['image', 'video', 'text']
 *                 example: "video"
 *               url:
 *                 type: string
 *                 example: "http://example.com/updatedcontent.jpg"
 *               theme:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c84"
 *               author:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c83"
 *               credits:
 *                 type: string
 *                 example: "username"
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c82"
 *                 title:
 *                   type: string
 *                   example: "Updated Content Title"
 *                 type:
 *                   type: string
 *                   example: "video"
 *                 url:
 *                   type: string
 *                   example: "http://example.com/updatedcontent.jpg"
 *                 theme:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *                 category:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c84"
 *                 author:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c83"
 *                 credits:
 *                   type: string
 *                   example: "username"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: title is required"
 */

router.post(
    '/',
    authorizeRole('creator'), // Verificar que el usuario tenga el rol 'creator'
    validate(createContentSchema),
    contentController.create
);

router.get(
    '/',
    contentController.getAll
);
router.get('/library', contentController.getLibrary)

router.get(
    '/:id',
    contentController.getById
);

router.patch(
    '/:id',
    authorizeRole('creator'), // Verificar que el usuario tenga el rol 'creator'
    validate(updateContentSchema),
    contentController.update
);

export default router;
