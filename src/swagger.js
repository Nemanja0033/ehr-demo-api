import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'EHR Demo API',
        version: '1.0.0',
      },

      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        },
      },

      paths: {
       '/api/hr/auth/register': {
            post: { 
                requestBody: {
                    required: true,
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          required: ['email', 'password', 'name'],
                          properties: {
                            email: { type: 'string', example: 'admin@company.com' },
                            password: { type: 'string', example: 'lozinka123' },
                            name: { type: 'string', example: 'Marko Markovic' }
                          }
                        }
                      }
                    }
                  },
                
                summary: 'HR register', tags: ['HR Auth'], responses: { 200: { description: 'OK' } } }
        
        },
        '/api/hr/auth/login': {
            post: { summary: 'HR login', tags: ['HR Auth'], responses: { 200: { description: 'OK' } } }
        },
        '/api/hr/auth/me': {
            get: { summary: 'Vrati trenutnog HR usera', tags: ['HR Auth'], security: [{ bearerAuth: [] }], responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } } }
        },

        '/api/hr/employes': {
            get: { 
                summary: 'Vrati sve zaposlene', 
                tags: ['Employe Manager'], 
                security: [{ bearerAuth: [] }], 
                responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } } 
            }
        },

        '/api/hr/vacation': {
            get: { 
                summary: 'Vrati sve vacation requestove', 
                tags: ['HR Vacation'], 
                security: [{ bearerAuth: [] }], 
                responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            },
            patch: { 
                summary: 'Review vacation request', 
                tags: ['HR Vacation'], 
                security: [{ bearerAuth: [] }], 
                responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            }
        },

        '/api/hr/sick-leave': {
            get: { 
                summary: 'Vrati sve sick leave reporte', 
                tags: ['HR Sick Leave'], 
                security: [{ bearerAuth: [] }], 
                responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            }
        },

        '/api/employe/auth/register': {
            post: { 
              summary: 'Employe register', 
              tags: ['Employe Auth'], 
              responses: { 200: { description: 'OK' } } 
            }
          },
          '/api/employe/auth/login': {
            post: { 
              summary: 'Employe login', 
              tags: ['Employe Auth'], 
              responses: { 200: { description: 'OK' } } 
            }
          },

          '/api/employe/auth/me': {
            get: { 
              summary: 'Vrati trenutnog zaposlenog', 
              tags: ['Employe Auth'], 
              security: [{ bearerAuth: [] }], 
              responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } } 
            }
          },
          
          '/api/company': {
            post: { 
              summary: 'Kreiraj kompaniju', 
              tags: ['Company'], 
              security: [{ bearerAuth: [] }], 
              responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            },
            get: { 
              summary: 'Vrati kompaniju', 
              tags: ['Company'], 
              security: [{ bearerAuth: [] }], 
              responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            }
          },
          
          '/api/employe/vacation': {
            post: { 
              summary: 'Podnesi vacation request', 
              tags: ['Employe Vacation'], 
              security: [{ bearerAuth: [] }], 
              responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            },
            get: { 
              summary: 'Vrati sve vacation requestove', 
              tags: ['Employe Vacation'], 
              security: [{ bearerAuth: [] }], 
              responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' } } 
            }
          },

          '/api/employe/sick-leave': {
            post: { 
                summary: 'Podnesi sick leave request', 
                tags: ['Employe Sick Leave'], 
                security: [{ bearerAuth: [] }], 
                responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            },
            get: { 
                summary: 'Vrati sve sick leave requestove', 
                tags: ['Employe Sick Leave'], 
                security: [{ bearerAuth: [] }], 
                responses: { 200: { description: 'OK' }, 401: { description: 'Unauthorized' }, 403: { description: 'Forbidden' } } 
            }
          },
      }
    },
    apis: [],
  };
  
  const specs = swaggerJsdoc(options);
  
  export { swaggerUi, specs };
  