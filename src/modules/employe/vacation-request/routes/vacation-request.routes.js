import express from 'express';
import { authMiddleware } from '../../../core/middlewares/auth.middleware.js';
import { roleMiddleware } from '../../../core/middlewares/role.middleware.js';
import { submitVacationRequest, getAllVacationRequests } from '../controllers/vacation-request.controller.js'

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('EMPLOYE'), submitVacationRequest);
router.get('/', authMiddleware, getAllVacationRequests);

export default router;