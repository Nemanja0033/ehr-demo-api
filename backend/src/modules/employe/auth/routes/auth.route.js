import express from 'express'
import { registerEmploye, loginEmploye, getMeEmploye} from '../controllers/auth.controller.js'
import {  authMiddleware } from '../../../core/middlewares/auth.middleware.js'

const router = express.Router();

router.post('/register', registerEmploye);
router.post('/login', loginEmploye);
router.get('/me', authMiddleware, getMeEmploye);

export default router
