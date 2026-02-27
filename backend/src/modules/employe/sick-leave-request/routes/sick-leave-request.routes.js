import express from 'express';
import { authMiddleware } from '../../../core/middlewares/auth.middleware.js'
import { roleMiddleware } from '../../../core/middlewares/role.middleware.js'
import { submitSickLeaveRequest, getSubmitedSickLeaveRequest } from '../controllers/sick-leave-request.controller.js'

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware("EMPLOYE"), submitSickLeaveRequest);
router.get('/', authMiddleware, roleMiddleware("EMPLOYE"), getSubmitedSickLeaveRequest);

export default router;