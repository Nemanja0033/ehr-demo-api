import express from 'express';
import cors from 'cors'
import hrAuthRoutes from '../src/modules/hr/auth/routes/auth.route.js'
import employerAuthRoutes from '../src/modules/employe/auth/routes/auth.route.js'
import companyRoutes from '../src/modules/company/routes/company.routes.js'
import employeManagerRoutes from '../src/modules/hr/employe-manager/routes/employe-manager.routes.js'
import employeVacationRequestRoutes from '../src/modules/employe/vacation-request/routes/vacation-request.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/hr/auth',  hrAuthRoutes);
app.use('/api/employe/auth', employerAuthRoutes);

app.use('/api/company', companyRoutes);
app.use('/api/hr/employes', employeManagerRoutes);
app.use('/api/employe/vacation', employeVacationRequestRoutes);

export default app;
