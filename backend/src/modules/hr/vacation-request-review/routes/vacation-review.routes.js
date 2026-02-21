import express from 'express';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';
import { roleMiddleware } from '../../../core/middlewares/role.middleware';

const router = express.Router();

router.patch('/', authMiddleware, roleMiddleware('HR'));