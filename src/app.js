import express from 'express';
import cors from 'cors'
import hrAuthRoutes from './modules/hr/auth/routes/auth.route.js'
import employerAuthRoutes from './modules/employe/auth/routes/auth.route.js'
import companyRoutes from './modules/hr/company/routes/company.routes.js'
import employeManagerRoutes from './modules/hr/employe-manager/routes/employe-manager.routes.js'
import employeVacationRequestRoutes from './modules/employe/vacation-request/routes/vacation-request.routes.js';
import vacationReqReviewRoutes from './modules/hr/vacation-request-review/routes/vacation-review.routes.js';
import employeSickLeaveRqeustRoutes from './modules/employe/sick-leave-request/routes/sick-leave-request.routes.js';
import sickLeaveReportsRoute from './modules/hr/sick-leave-reports/routes/sick-leave-reports.route.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/hr/auth',  hrAuthRoutes);
app.use('/api/hr/employes', employeManagerRoutes);
app.use('/api/hr/vacation', vacationReqReviewRoutes);
app.use('/api/hr/sick-leave', sickLeaveReportsRoute);

app.use('/api/employe/auth', employerAuthRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/employe/vacation', employeVacationRequestRoutes);
app.use('/api/employe/sick-leave', employeSickLeaveRqeustRoutes);

export default app;
