import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /farm:
 *   get:
 *     summary: Get all farms
 *     responses:
 *       200:
 *         description: List of farms
 */
router.get('/farm', (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'Farm A' }]);
});

export default router;
