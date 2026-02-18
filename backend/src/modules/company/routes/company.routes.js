import express from 'express'
import { createCompany, getCompany} from '../controllers/company.controller.js'
import { roleMiddleware } from '../../core/middlewares/role.middleware.js';

const router = express.Router();

router.post('/', roleMiddleware("HR"), createCompany);
router.get('/', getCompany);

export default router;