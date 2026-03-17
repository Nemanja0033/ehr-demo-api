import express from 'express';
import { getEmployes } from '../controller/employe-manager.controller.js'
import { authMiddleware } from '../../../../middlewares/auth.middleware.js'
import { companyIdMiddleware } from '../../../../middlewares/companyId.middleware.js'

const router = express.Router();

router.get('/', authMiddleware, companyIdMiddleware, getEmployes);

export default router;