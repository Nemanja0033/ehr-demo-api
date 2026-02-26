import express from 'express';
import { authMiddleware } from '../../../core/middlewares/auth.middleware.js'
import { roleMiddleware } from '../../../core/middlewares/role.middleware.js'
import { submitSickLeaveRequest } from '../controllers/sick-leave-request.controller.js'

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware("EMPLOYE"), submitSickLeaveRequest);

export default router;