import express from 'express';
import { getSickLeaveReports } from '../controllers/sick-leave-reports.controller.js'
import { authMiddleware } from '../../../core/middlewares/auth.middleware.js';
import { roleMiddleware } from '../../../core/middlewares/role.middleware.js';
import { companyIdMiddleware } from '../../../core/middlewares/companyId.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware("HR"), companyIdMiddleware, getSickLeaveReports);

export default router;