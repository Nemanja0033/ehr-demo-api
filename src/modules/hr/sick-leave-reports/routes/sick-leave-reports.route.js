import express from 'express';
import { getSickLeaveReports } from '../controllers/sick-leave-reports.controller.js'
import { authMiddleware } from '../../../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../../../middlewares/role.middleware.js';
import { companyIdMiddleware } from '../../../../middlewares/companyId.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware("HR"), companyIdMiddleware, getSickLeaveReports);

export default router;