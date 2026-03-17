import express from 'express'
import { createCompany, getCompany} from '../controllers/company.controller.js'
import { roleMiddleware } from '../../../../middlewares/role.middleware.js';
import { authMiddleware } from '../../../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware("HR"), createCompany);
router.get('/', authMiddleware, roleMiddleware("HR"), getCompany);

export default router;