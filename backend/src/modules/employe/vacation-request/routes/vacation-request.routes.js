import express from 'express';
import { authMiddleware } from '../../../core/middlewares/auth.middleware.js';
import { roleMiddleware } from '../../../core/middlewares/role.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('EMPLOYE'));
router.get('/', authMiddleware);

export default router;