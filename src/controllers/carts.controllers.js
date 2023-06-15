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
 *   name: Carts
 *   description: API endpoints for cart operations
 *
 * /carts/:
 *   get:
 *     summary: Get all carts by customer ID
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Success. Retrieves cart data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart data not found.
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     summary: Add a product to the customer's cart using the product ID.
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *             example:
 *               productId: 123
 *     responses:
 *       201:
 *         description: Success. The product is added to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request. Telephone is already used.
 *       500:
 *         description: Internal server error.
 *
 * /carts/{productId}:
 *   delete:
 *     summary: Delete a product from the customer's cart using the product ID.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Success. The product is deleted from the cart.
 *       400:
 *         description: Bad request. No ID is specified.
 *       404:
 *         description: Product data not found.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     summary: Reduce the product count in the customer's cart.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Success. The product count is reduced.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request. No ID is specified.
 *       404:
 *         description: Cart data not found.
 *       500:
 *         description: Internal server error.
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
    const productInCarts = await Cart.findOne({ where: { productId, customerId: req.userId } });
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
    console.error(error);
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
