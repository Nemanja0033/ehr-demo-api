import express from 'express'
import { registerHr, loginHr, getMeHr } from '../controllers/auth.controller.js'
import { authMiddleware } from '../../../../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/register', registerHr);
router.post('/login', loginHr);
router.get('/me', authMiddleware, getMeHr);

export default router
