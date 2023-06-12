/* eslint-disable no-unused-vars */
/**
* Programmer: D'Riski Maulana
* Filename: order.controllers.js
* Contact: driskimaulana@upi.edu
* Date: June 09, 2023
* Description: This is controllers for order functionality
* */
const {
  Order, OrderDetail, Customers, Product, sequelize, OrderStatus,
} = require('../../database/models');
const { createInvoince, getPaymentDetails } = require('../services/payment.service');

const getAllOrder = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    // const customerCarts = await Cart.findAll({ where: { customerId: req.userId } });

    const orders = await sequelize.query(
      `SELECT "Orders".id, "Orders".freight, "OrderStatuses"."statusName", "Customers"."fullName"
      FROM "Orders" 
      INNER JOIN "OrderStatuses" ON "Orders"."orderStatusId" = "OrderStatuses".id 
      INNER JOIN "Customers" ON "Customers".id = "Orders"."customerId" `,
    );

    // const orders = await Order.findAll();

    if (!orders) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No Data found in database.',
      });
      return response;
    }

    const ordersData = [];

    // eslint-disable-next-line array-callback-return
    orders[0].map((e) => {
      ordersData.push(e);
    });

    // eslint-disable-next-line guard-for-in
    for (const i in ordersData) {
      const prods = await OrderDetail.findAll(
        { where: { orderId: ordersData[i].id } },
      );
      ordersData[i].products = [];

      // eslint-disable-next-line guard-for-in
      for (const j in prods) {
        const prodDetails = await Product.findOne(
          {
            attributes: ['productName', 'pictures', 'unitPrice'],
            where: { id: prods[j].productId },
          },

        );
        ordersData[i].products.push({ ...prodDetails.dataValues, quantity: prods[j].quantity });
      }
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch orders data success.',
      data: ordersData,
    });

    return response;
  } catch (error) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

const createOrder = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    products,
    freight,
  } = req.body;

  const { userId } = req;

  try {
    const customer = await Customers.findOne({ where: { id: userId } });
    if (!customer) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Customer is not found in database',
      });
      return response;
    }

    let total = 0;

    // eslint-disable-next-line guard-for-in
    for (const i in products) {
      const prod = await Product.findOne({ where: { id: products[i].id } });
      total += prod.unitPrice * products[i].quantity;
    }

    const invoice = await createInvoince(total + freight, customer.email, userId);

    if (invoice.status === 'failed') {
      const response = res.status(invoice.statusCode).json({
        status: invoice.status,
        message: invoice.message,
      });
      return response;
    }

    const order = await Order.create({
      customerId: userId,
      paymentId: invoice.data.id,
      freight,
      orderStatusId: 1,
      totalPayment: invoice.data.amount,
    });

    // eslint-disable-next-line guard-for-in
    for (const i in products) {
      await OrderDetail.create({
        orderId: order.id,
        productId: products[i].id,
        quantity: products[i].quantity,
      });
    }

    const response = res.status(201).json({
      status: 'success',
      message: 'Order Success',
      data: {
        orderId: invoice.data.id,
        customerEmail: invoice.data.payer_email,
        urlPayment: invoice.data.invoice_url,
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
  }
};

const getOrderDetails = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req;

  const { orderId } = req.params;

  try {
    const customer = await Customers.findOne({ where: { id: userId } });
    if (!customer) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Customer is not found in database',
      });
      return response;
    }

    const order = await Order.findOne({ where: { id: orderId, customerId: userId } });

    if (!order) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No order is found.',
      });
      return response;
    }

    const paymentDetails = await getPaymentDetails(order.paymentId);

    if (paymentDetails.status === 'failed') {
      const response = res.status(paymentDetails.statusCode).json({
        status: paymentDetails.status,
        message: paymentDetails.message,
      });
      return response;
    }

    const response = res.status(201).json({
      status: 'success',
      message: 'Order Success',
      data: {
        payment: {
          status: paymentDetails.data.status,
          amount: paymentDetails.data.amount,
          url: paymentDetails.data.invoice_url,
          expireDate: paymentDetails.data.expire_date,
        },
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
  }
};

const getOrderByCustomerId = async (
/** @@type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req;

  try {
    // const customerCarts = await Cart.findAll({ where: { customerId: req.userId } });
    // const orders = await Order.findAll(
    //   { attributes: ['id', 'customerId', 'freight', 'orderStatusId', 'paymentId'] },
    //   { where: { customerId: userId } },
    // );

    const orders = await sequelize.query(
      `SELECT "Orders".id, "Orders".freight, "OrderStatuses"."statusName"
      FROM "Orders" 
      LEFT JOIN "OrderStatuses" ON "Orders"."orderStatusId" = "OrderStatuses".id 
      WHERE "Orders"."customerId"=${userId};`,
    );

    const ordersData = [];

    // eslint-disable-next-line array-callback-return
    orders[0].map((e) => {
      ordersData.push(e);
    });

    // eslint-disable-next-line guard-for-in
    for (const i in ordersData) {
      const prods = await OrderDetail.findAll(
        { where: { orderId: ordersData[i].id } },
      );
      ordersData[i].products = [];

      // eslint-disable-next-line guard-for-in
      for (const j in prods) {
        const prodDetails = await Product.findOne(
          {
            attributes: ['productName', 'pictures', 'unitPrice'],
            where: { id: prods[j].productId },
          },

        );
        ordersData[i].products.push({ ...prodDetails.dataValues, quantity: prods[j].quantity });
      }
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch customer orders history data success.',
      data: ordersData,
    });

    return response;
  } catch (error) {
    console.error(error);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

const changeToOnShipping = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req;
  const { orderId } = req.params;

  try {
    let order = await Order.findOne({ where: { id: orderId, customerId: userId } });
    if (!order) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No order is found.',
      });
      return response;
    }

    const updatedAt = new Date().toISOString();

    order = {
      orderStatusId: 3,
      shipDate: new Date().toISOString(),
      updatedAt,
    };
    await Order.update({ ...order }, { where: { id: orderId } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Update data successfull',
    });
    return response;
  } catch (error) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

const changeToFinish = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req;
  const { orderId } = req.params;

  try {
    let order = await Order.findOne({ where: { id: orderId, customerId: userId } });
    if (!order) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No order is found.',
      });
      return response;
    }

    const updatedAt = new Date().toISOString();

    order = {
      orderStatusId: 4,
      updatedAt,
    };
    await Order.update({ ...order }, { where: { id: orderId } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Update data successfull',
    });
    return response;
  } catch (error) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  getOrderDetails,
  getOrderByCustomerId,
  changeToOnShipping,
  changeToFinish,
};
