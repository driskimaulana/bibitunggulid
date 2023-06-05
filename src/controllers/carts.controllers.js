/**
* Programmer: D'Riski Maulana
* Filename: carts.controllers.js
* Contact: driskimaulana@upi.edu
* Date: June 01, 2023
* Description: This is controllers for functionality related
* to cart system
* */

const { Cart, sequelize } = require('../../database/models');

/**
 * @swagger
 * tags:
 *  name: Carts CRUD
 *  description: The carts crud operations API
 * /carts/:
 *  get:
 *      summary: get all carts by customer id
 *      tags: [Carts CRUD]
 *      responses:
 *          200:
 *              desciption: get cart data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cart'
 *          404:
 *              description: Cart data is not found
 *          500:
 *              description: Service unavailable
 *  post:
 *      summary: Add product to customers cart using productId.
 *      tags: [Carts CRUD]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Cart'
 *                  summary: The product id
 *      responses:
 *          201:
 *              description: New account succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          400:
 *              description: Telphone is already used
 *          500:
 *              description: Service is unavailable
 * /carts/{productId}:
 *  delete:
 *      summary: delete product from customers cart using product id
 *      tags: [Carts CRUD]
 *      parameters:
 *          -   in: path
 *              name: productId
 *              schema:
 *                  type: int
 *              summary: The product id
 *      responses:
 *          200:
 *              desciption: delete product data success
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 *  put:
 *      summary: reduce product count in the customers cart
 *      tags: [Carts CRUD]
 *      parameters:
 *          -   in: path
 *              name: productId
 *              schema:
 *                  type: int
 *              summary: The product id
 *      responses:
 *          200:
 *              desciption: Product successfully reduced.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cart'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Cart data is not found
 *          500:
 *              description: Service unavailable
 */

const getCartByCustomerId = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    // const customerCarts = await Cart.findAll({ where: { customerId: req.userId } });

    const customerCarts = await sequelize.query(
      `SELECT "Carts".id, "Products".id as "productId", "Products"."productName", 
        "Products"."unitPrice", "Products".pictures, 
        "Carts".count FROM "Products" 
        LEFT JOIN "Carts" ON "Products".id = "Carts"."productId" 
        WHERE "Carts"."customerId"=${req.userId};
        `,
    );

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch customer cart data success.',
      data: customerCarts[0],
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

const addProductToCustomerCarts = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { productId } = req.body;
  try {
    console.log(req.userId);
    const productInCarts = await Cart.findOne({ where: { productId, customerId: req.userId } });
    console.log(productInCarts);
    if (!productInCarts) {
      const cartCreated = await Cart.create({ productId, customerId: req.userId, count: 1 });
      const response = res.status(201).json({
        status: 'success',
        message: 'Add product success.',
        data: cartCreated,
      });
      return response;
    }

    const updatedCart = await productInCarts.increment('count');

    // productInCarts = {
    //   count: productInCarts.count + 1,
    // };

    // await Cart.update({ ...productInCarts }, { where: { customerId: req.userId, productId } });

    const response = res.status(201).json({
      status: 'success',
      message: 'Add product success',
      data: updatedCart,
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

const deleteProductFromCustomersCart = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    const productToBeDeleted = await Cart.findOne({ where: { productId, customerId: userId } });

    if (!productToBeDeleted) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Data is not found.',
      });
      return response;
    }

    await Cart.destroy({ where: { productId, customerId: userId } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Delete data success.',
    });
    return response;
  } catch (error) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
  }
};

const reduceProductFromCustomersCart = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    let productToBeReduced = await Cart.findOne({ where: { productId, customerId: userId } });

    if (!productToBeReduced) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Data is not found.',
      });
      return response;
    }

    let response;

    if (productToBeReduced.count === 1) {
      await Cart.destroy({ where: { productId, customerId: userId } });
      response = res.status(200).json({
        status: 'success',
        message: 'Delete data success.',
      });
    } else {
      productToBeReduced = {
        count: productToBeReduced.count - 1,
      };

      await Cart.update({ ...productToBeReduced }, { where: { customerId: userId, productId } });
      response = res.status(200).json({
        status: 'success',
        message: 'Data reduced',
        data: productToBeReduced,
      });
    }

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

module.exports = {
  getCartByCustomerId,
  addProductToCustomerCarts,
  deleteProductFromCustomersCart,
  reduceProductFromCustomersCart,
};
