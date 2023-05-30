/**
 * Programmer: D'Riski Maulana
 * Filename: index.js
 * Contact: driskimaulana@upi.edu
 * Date: May 18, 2023
 * Description: Starting point for this application. Start server.
 * */

// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUI from 'swagger-ui-express';
// import * as dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';
// import authenticatiosRoutes from './src/routes/authentication.routes.js';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const dotenv = require('dotenv');
const authenticatiosRoutes = require('./src/routes/authentication.routes.js');
const customerRoutes = require('./src/routes/customers.routes.js');
const productRoutes = require('./src/routes/customers.routes.js');
const favoriteRoutes = require('./src/routes/favorite.routes.js');
// swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BibitUnggulId API',
      version: '0.1.0',
      description: 'This is an API for the BibitUnggulId applications',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'BibitUnggulId',
        url: 'bibitunggul.id',
        email: 'bibitunggulid@gmail.com',
      },
    },
    servers: [{
      url: 'http://127.0.0.1:5000',
    }],
  },
  apis: ['./src/routes/*.js',
    './database/models/*.js',
    './src/controllers/*.js',
  ],
};

const init = () => {
  // setting up the server
  const server = express();
  server.use(bodyParser.json({ limit: '10mb', extended: true }));
  server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  server.use(cors());

  dotenv.config();

  //   setting up swagger
  const specs = swaggerJSDoc(options);
  server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
  server.use('/authentication', authenticatiosRoutes);
  server.use('/customers', customerRoutes);
  server.use('/product', productRoutes);
  server.use('/favorite', favoriteRoutes);

  const PORT = process.env.PORT || 8080;

  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
};

init();
