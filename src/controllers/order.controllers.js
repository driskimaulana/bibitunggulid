/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/**
* Programmer: D'Riski Maulana
* Filename: order.controllers.js
* Contact: driskimaulana@upi.edu
* Date: June 09, 2023
* Description: This is controllers for order functionality
* */
const { Op } = require('sequelize');
const { raw } = require('body-parser');
const {
  Order, OrderDetail, Customers, Product, sequelize, OrderStatus,
  Shipment,
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
      const prodsId = [];
      const quantity = [];
      prods.map((e) => prodsId.push(e.productId));
      prods.map((e) => quantity.push(e.quantity));

      ordersData[i].products = await Product.findAll({
        attributes: ['id', 'productName', 'pictures', 'unitPrice'],
        where: {
          id: {
            [Op.in]: prodsId,
          },
        },
        raw: true,
      });

      quantity.map((e, x) => ordersData[i].products[x] = { ...ordersData[i].products[x], quantity: e });

      ordersData[i].products = [...ordersData[i].products];

      // eslint-disable-next-line guard-for-in
      //   for (const j in prods) {
      //     const prodDetails = await Product.findOne(
      //       {
      //         attributes: ['productName', 'pictures', 'unitPrice'],
      //         where: { id: prods[j].productId },
      //       },

    //     );
    //     ordersData[i].products.push({ ...prodDetails.dataValues, quantity: prods[j].quantity });
    //   }
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
    shipAddressId,
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

    const invoice = await createInvoince(total + 10000, customer.email, userId);

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
      shipAddressId,
      freight: 10000,
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
        orderId: order.id,
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
  /** @type Response */ res,
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

    const orders = await sequelize.query(
      `SELECT "Orders".id, "Orders".freight, "Orders"."createdAt", "OrderStatuses"."statusName", "Orders"."paymentId",
      "ShipAddresses"."fullAddress", "ShipAddresses".name, "ShipAddresses".phone AS "shipPhone",  "Orders"."shipmentId",
      "ShipAddresses".province, "ShipAddresses".city, "ShipAddresses"."subDistrict", "ShipAddresses"."postalCode"
      FROM "Orders" 
      INNER JOIN "OrderStatuses" ON "Orders"."orderStatusId" = "OrderStatuses".id 
      INNER JOIN "ShipAddresses" ON "Orders"."shipAddressId" = "ShipAddresses".id
      WHERE "Orders".id=${orderId};`,
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
      // const prodsId = [];
      // prods.map((e) => prodsId.push(e.productId));

      const prodsId = [];
      const quantity = [];
      prods.map((e) => prodsId.push(e.productId));
      prods.map((e) => quantity.push(e.quantity));

      ordersData[i].products = await Product.findAll({
        attributes: ['id', 'productName', 'pictures', 'unitPrice'],
        where: {
          id: {
            [Op.in]: prodsId,
          },
        },
        raw: true,
      });

      quantity.map((e, x) => ordersData[i].products[x] = { ...ordersData[i].products[x], quantity: e });

      ordersData[i].products = [...ordersData[i].products];

      // eslint-disable-next-line guard-for-in
      // for (const j in prods) {
      //   const prodDetails = await Product.findOne(
      //     {
      //       attributes: ['id', 'productName', 'pictures', 'unitPrice'],
      //       where: { id: prods[j].productId },
      //     },

      //   );
      //   ordersData[i].products.push({ ...prodDetails.dataValues, quantity: prods[j].quantity });
      // }
    }

    let shipment = null;
    if (ordersData[0].shipmentId) {
      shipment = await Shipment.findOne({
        attributes: [
          'courierName',
          'phone',
          'delieveryTime',
          'estimatedReceiveTime',
        ],
        where: { id: ordersData[0].shipmentId },
      });
    }

    let responseData = { ...ordersData[0] };
    if (shipment) {
      responseData = { ...responseData, ...shipment.dataValues };
    } else {
      shipment = {
        courierName: '-',
        phone: '-',
        delieveryTime: '-',
        estimatedReceiveTime: '-',
      };
      responseData = { ...responseData, ...shipment };
    }

    let totalHarga = 0;
    ordersData[0].products.map(
      (e) => totalHarga += e.unitPrice * e.quantity,
    );

    responseData = { ...responseData, totalHarga };

    const response = res.status(201).json({
      status: 'success',
      message: 'Order Success',
      data: {
        ...responseData,
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

const getOrderPaymentDetails = async (
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

    const response = res.status(200).json({
      status: 'success',
      message: 'Order Success',
      data: {
        status: paymentDetails.data.status,
        amount: paymentDetails.data.amount,
        url: paymentDetails.data.invoice_url,
        expireDate: paymentDetails.data.expire_date,
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
      `SELECT "Orders".id, "Orders".freight, "Orders"."createdAt", "OrderStatuses"."statusName",
      "ShipAddresses"."fullAddress"
      FROM "Orders" 
      INNER JOIN "OrderStatuses" ON "Orders"."orderStatusId" = "OrderStatuses".id 
      INNER JOIN "ShipAddresses" ON "Orders"."shipAddressId" = "ShipAddresses".id
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
        {
          where: { orderId: ordersData[i].id },
        },
      );
      ordersData[i].products = [];

      const prodsId = [];
      const quantity = [];
      prods.map((e) => prodsId.push(e.productId));
      prods.map((e) => quantity.push(e.quantity));

      ordersData[i].products = await Product.findAll({
        attributes: ['id', 'productName', 'pictures', 'unitPrice'],
        where: {
          id: {
            [Op.in]: prodsId,
          },
        },
        raw: true,
      });

      quantity.map((e, x) => ordersData[i].products[x] = { ...ordersData[i].products[x], quantity: e });

      ordersData[i].products = [...ordersData[i].products];

      // eslint-disable-next-line guard-for-in
      // for (const j in prods) {
      //   const prodDetails = await Product.findOne(
      //     {
      //       attributes: ['id', 'productName', 'pictures', 'unitPrice'],
      //       where: { id: prods[j].productId },
      //     },

      //   );
      //   ordersData[i].products.push({ ...prodDetails.dataValues, quantity: prods[j].quantity });
      // }
    }

    // console.log(ordersData);

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
  const {
    courierName, phone, delieveryTime, estimatedReceiveTime,
  } = req.body;

  try {
    let order = await Order.findOne({ where: { id: orderId, customerId: userId } });
    if (!order) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No order is found.',
      });
      return response;
    }

    const shipment = await Shipment.create({
      phone,
      courierName,
      delieveryTime,
      estimatedReceiveTime,
    });

    if (!shipment) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Failed to save shipment details.',
      });
      return response;
    }

    const updatedAt = new Date().toISOString();

    order = {
      orderStatusId: 3,
      shipmentId: shipment.dataValues.id,
      shipDate: new Date().toISOString(),
      updatedAt,
    };
    await Order.update({ ...order }, { where: { id: orderId } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Update data successfull',
      data: shipment,
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
  getOrderPaymentDetails,
  getOrderByCustomerId,
  changeToOnShipping,
  changeToFinish,
};
