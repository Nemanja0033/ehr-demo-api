import express from 'express';
import cors from 'cors'
import hrAuthRoutes from '../src/modules/hr/auth/routes/auth.route.js'
import employerAuthRoutes from '../src/modules/employe/auth/routes/auth.route.js'
import companyRoutes from '../src/modules/company/routes/company.routes.js'
import { authMiddleware } from './modules/core/middlewares/auth.middleware.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/hr/auth',  hrAuthRoutes);
app.use('/api/employe/auth', employerAuthRoutes);

app.use(authMiddleware);
app.use('/api/company', companyRoutes);

export default app;
