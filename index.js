/* eslint-disable camelcase */
/**
 * Programmer: D'Riski Maulana
 * Filename: index.js
 * Contact: driskimaulana@upi.edu
 * Date: May 18, 2023
 * Description: Starting point for this application. Start server.
 * */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const { Order } = require('./database/models');
const authenticatiosRoutes = require('./src/routes/authentication.routes.js');
const customerRoutes = require('./src/routes/customers.routes.js');
const productRoutes = require('./src/routes/product.routes.js');
const cartRoutes = require('./src/routes/carts.routes.js');
const categoryRoutes = require('./src/routes/category.routes.js');
const shipAddressRoutes = require('./src/routes/shipaddress.routes.js');
const supplierRoutes = require('./src/routes/suppliers.routes.js');
const plantRoutes = require('./src/routes/plants.routes.js');
const favoriteRoutes = require('./src/routes/favorite.routes.js');
const adminAccountRoutes = require('./src/routes/adminaccount.routes.js');
const orderRoutes = require('./src/routes/order.routes.js');

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
    servers: [
      {
        url: 'http://127.0.0.1:5000',
      },
      {
        url: 'https://dev-bibitunggulid-zldx7crkfq-et.a.run.app',
      },
    ],
  },
  apis: ['./src/routes/*.js',
    './database/models/*.js',
    './src/controllers/*.js',
  ],
};

const init = () => {
  // setting up the server
  const server = express();
  server.use(bodyParser.json({ limit: '30mb', extended: true }));
  server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  server.use(cors());

  server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  // middlewares
  server.use(morgan('common'));
  dotenv.config();
  //   setting up swagger
  const specs = swaggerJSDoc(options);

  // web hook for xendit payment
  // trigger when there is done payment
  // eslint-disable-next-line consistent-return
  server.post('/xendit-webhook', async (req, res) => {
    // const { event, data } = req.body;

    const {
      id, status, paid_at,
    } = req.body;

    if (status === 'PAID') {
      try {
        let order = await Order.findOne({ where: { paymentId: id } });

        if (!order) {
          const response = res.status(404).json({
            status: 'failed',
            message: 'Order is not found',
          });
          return response;
        }

        const updatedAt = new Date().toISOString();

        order = {
          paymentDate: paid_at,
          orderStatusId: 2,
          updatedAt,
        };

        await Order.update({ ...order }, { where: { id: order.id } });

        const response = res.status(200).json({
          status: 'success',
          message: 'Pay success. Wait for the shipment.',
        });
        return response;
      } catch (error) {
        const response = res.status(500).json({
          status: 'failed',
          error: error.message,
          body: req.body,
          id,
          statusBody: status,
          paidAt: paid_at,
          message: 'Server unavailable.',
        });
        return response;
      }
    }

    // if (event === 'invoice.paid' && data.status === 'PAID') {
    //   // Pembayaran telah berhasil, lakukan tindakan yang sesuai
    //   console.log('Pembayaran berhasil:', data.external_id);

    // }

    res.status(200).end();
  });

  server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
  server.use('/authentication', authenticatiosRoutes);
  server.use('/customers', customerRoutes);
  server.use('/product', productRoutes);
  server.use('/carts', cartRoutes);
  server.use('/favorite', favoriteRoutes);
  server.use('/category', categoryRoutes);
  server.use('/shipaddress', shipAddressRoutes);
  server.use('/suppliers', supplierRoutes);
  server.use('/plants', plantRoutes);
  server.use('/admin', adminAccountRoutes);
  server.use('/orders', orderRoutes);

  const PORT = process.env.PORT || 8080;

  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
};

init();
