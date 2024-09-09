import { Router } from "express";
import mongoose from "mongoose";
const router = Router()
/**
 * @swagger
 * tags:
 *   name: HealthCheck
 *   description: Endpoints para verificar el estado del servicio
 */

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Verifica el estado del servicio
 *     tags: [HealthCheck]
 *     responses:
 *       200:
 *         description: Servicio saludable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 message:
 *                   type: string
 *                   example: "Service is healthy"
 *                 dbStatus:
 *                   type: string
 *                   example: "connected"
 *       500:
 *         description: Servicio no saludable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Service is not healthy"
 *                 dbStatus:
 *                   type: string
 *                   example: "disconnected"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.get('/', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
        if (dbStatus !== 'connected') {
            return res.status(500).json({
                status: 'error',
                message: 'Service is not healthy',
                dbStatus
            })
        }

        res.status(200).json({
            status: 'ok',
            message: 'Service is healthy',
            dbStatus
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Service is not healthy',
            error: err.message
        })

    }
})
export default router