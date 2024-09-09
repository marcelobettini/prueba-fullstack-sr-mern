import { Router } from 'express';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validateRequest.js';
import themeController from '../controllers/themeController.js';
import { createThemeSchema, updateThemeSchema } from '../validators/themeValidator.js'

const router = Router();
router.use(authenticateJWT)
/**
 * @swagger
 * tags:
 *   name: Theme
 *   description: Endpoints para gestionar temas
 */

/**
 * @swagger
 * /themes:
 *   get:
 *     summary: Obtiene todos los temas
 *     tags: [Theme]
 *     responses:
 *       200:
 *         description: Lista de temas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   name:
 *                     type: string
 *                     example: "Nature"
 *                   description:
 *                     type: string
 *                     example: "Themes related to nature and environment"
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
 * /themes:
 *   post:
 *     summary: Crea un nuevo tema
 *     tags: [Theme]
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
 *                 example: "Technology"
 *               description:
 *                 type: string
 *                 example: "Themes related to technology and gadgets"
 *     responses:
 *       201:
 *         description: Tema creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c86"
 *                 name:
 *                   type: string
 *                   example: "Technology"
 *                 description:
 *                   type: string
 *                   example: "Themes related to technology and gadgets"
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
 * /themes/{id}:
 *   patch:
 *     summary: Actualiza un tema existente
 *     tags: [Theme]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Theme Name"
 *               description:
 *                 type: string
 *                 example: "Updated description for the theme"
 *     responses:
 *       200:
 *         description: Tema actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *                 name:
 *                   type: string
 *                   example: "Updated Theme Name"
 *                 description:
 *                   type: string
 *                   example: "Updated description for the theme"
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

router.get('/', themeController.getAll)

router.post(
    '/',
    authorizeRole('admin'),
    validate(createThemeSchema),
    themeController.create
);

router.patch(
    '/:id',
    authorizeRole('admin'),
    validate(updateThemeSchema),
    themeController.update
);


export default router;