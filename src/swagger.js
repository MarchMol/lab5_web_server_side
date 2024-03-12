import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
  info: {
    title: 'Endpoint Documentation',
    version: '1.0.0',
    description: 'Endpoint documentation for the simple API done for blogposts',
  },
  basePath: '/',
}

const options = {
  swaggerDefinition,
  apis: ['src/main.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
