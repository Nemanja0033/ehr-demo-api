import express from 'express';
import { authMiddleware } from '../../../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../../../middlewares/role.middleware.js';
import { companyIdMiddleware } from '../../../../middlewares/companyId.middleware.js';
import { getVacationRequests, reviewVacationRequest } from '../controllers/vacation-review.controller.js';

const router = express.Router();

router.patch('/', authMiddleware, roleMiddleware('HR'), reviewVacationRequest);
router.get('/', authMiddleware, roleMiddleware("HR"), companyIdMiddleware, getVacationRequests);

export default router;