import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateRequest.js';
import { createCategorySchema, updateCategorySchema } from '../validators/categoryValidator.js';

const router = Router();
router.use(authenticateJWT)
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para gestionar categorías
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Photography"
 *               type:
 *                 type: string
 *                 enum: ['image', 'video', 'document']
 *                 example: "image"
 *               coverImage:
 *                 type: string
 *                 example: "http://example.com/cover.jpg"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c84"
 *                 name:
 *                   type: string
 *                   example: "Photography"
 *                 type:
 *                   type: string
 *                   example: "image"
 *                 coverImage:
 *                   type: string
 *                   example: "http://example.com/cover.jpg"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: name is required"
 */

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualiza una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c84"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category"
 *               type:
 *                 type: string
 *                 enum: ['image', 'video', 'document']
 *                 example: "video"
 *               coverImage:
 *                 type: string
 *                 example: "http://example.com/newcover.jpg"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c84"
 *                 name:
 *                   type: string
 *                   example: "Updated Category"
 *                 type:
 *                   type: string
 *                   example: "video"
 *                 coverImage:
 *                   type: string
 *                   example: "http://example.com/newcover.jpg"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: name is required"
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c84"
 *                   name:
 *                     type: string
 *                     example: "Photography"
 *                   type:
 *                     type: string
 *                     example: "image"
 *                   coverImage:
 *                     type: string
 *                     example: "http://example.com/cover.jpg"
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
router.post(
    '/',
    authorizeRole('admin'),
    validate(createCategorySchema),
    categoryController.create
);

router.patch(
    '/:id',

    authorizeRole('admin'),
    validate(updateCategorySchema),
    categoryController.update
);

router.get('/', categoryController.getAll)

export default router;
