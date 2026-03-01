## Backend

**Express + Prisma + PostgreSQL backend for a demo multitenant e-HR platform.**

### Application Architecture
- **Framework:** Express.js REST API
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT-based authentication and role management (HR vs Employee)
- **Multitenancy:** Data isolation by `companyId` — multiple companies can use the same application, each with their own HR and employees
- **WebSocket integration:** Socket.IO for real-time notifications and live data updates
  - Employees receive instant confirmation when submitting vacation or sick leave requests
  - HR receives real-time notifications and updates about new employee requests

### Application Features
- **HR portal backend:**
  - HR registration and authentication
  - Company management (demo)
  - Employee management (demo)
  - Vacation request review
  - Sick leave reports
  - Real-time notifications for employee requests
- **Employee portal backend:**
  - Vacation request submission
  - Sick leave submission
  - Real-time confirmation and updates

### Status
This backend is in **demo version**, which means:
- The code is not fully tested or production-ready.
- Some parts need to be fixed, optimized, and scaled for real-world usage.
- Possible mistakes or architectural trade-offs are known and will be addressed in future iterations.
