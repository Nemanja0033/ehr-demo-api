import express from 'express'
import { registerEmploye, loginEmploye, getMeEmploye} from '../controllers/auth.controller.js'
import { authMiddleware } from '../../../../middlewares/auth.middleware.js'
import { companyIdMiddleware } from '../../../../middlewares/companyId.middleware.js'

const router = express.Router();

router.post('/register', companyIdMiddleware, registerEmploye);
router.post('/login', loginEmploye);
router.get('/me', authMiddleware, getMeEmploye);

export default router
