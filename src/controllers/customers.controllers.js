/**
* Programmer: D'Riski Maulana
* Filename:customers.controllers.js
* Contact: driskimaulana@upi.edu
* Date:May 24, 2023
* Description: This is controllers for customers
* */
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Customer = require('../../database/models').Customers;

/**
 * @swagger
 * tags:
 *  name: Customers
 *  description: The customer crud operations API
 * /customers/:
 *  get:
 *      summary: get all custonmers data
 *      tags: [Customers ]
 *      responses:
 *          200:
 *              desciption: get customers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          404:
 *              description: Customer data is not found
 *          500:
 *              description: Service unavailable
 * /customers/{id}:
 *  get:
 *      summary: get custonmers data by id
 *      tags: [Customers ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The customers id
 *      responses:
 *          200:
 *              desciption: get customers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Customer data is not found
 *          500:
 *              description: Service unavailable
 *  delete:
 *      summary: delete cutomers by id
 *      tags: [Customers ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The customers id
 *      responses:
 *          200:
 *              desciption: delete customers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Customer data is not found
 *          500:
 *              description: Service unavailable
 *  put:
 *      summary: update custonmers data
 *      tags: [Customers ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The customers id
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'
 *      responses:
 *          200:
 *              desciption: get customers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Customer data is not found
 *          500:
 *              description: Service unavailable
 */

const getCustomers = async (
/** @type import("express").Request */ req,
  /** @type import("express").Response */ res,
) => {
  try {
    const customers = await Customer.findAll();

    if (!customers) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No customers data found.',
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      data: customers,
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

const getCustomersById = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    if (!id) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'No id specified in the url.',
      });
      return response;
    }

    const customer = await Customer.findOne({ where: { id } });
    if (!customer) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Customer with id: ${id} is not found.`,
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Get data success.',
      data: customer,
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

const updateCustomers = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    phone, email, fullName,
  } = req.body;

  try {
    let customer = await Customer.findOne({ where: { id } });
    if (!customer) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Customers with id: ${id} is not found.`,
      });
      return response;
    }
    const updatedAt = new Date().toISOString();

    customer = {
      phone, email, fullName, updatedAt,
    };

    await Customer.update({ ...customer }, { where: { id } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Update data successful',
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

const deleteCustomers = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.body;
  try {
    await Customer.destroy({ where: { id } });
    const response = res.status(200).json({
      status: 'success',
      message: 'Data deleted succesfully.',
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

const changePasswordCustomers = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { oldPassword, newPassword } = req.body;

  const { userId } = req;

  try {
    // search for customers data in database
    let customer = await Customer.findOne({
      where: { id: userId },
    });

    if (!customer) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Email is not found.',
      });
      return response;
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, customer.password);
    if (!isPasswordCorrect) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Old password is incorrect.',
      });
      return response;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedAt = new Date().toISOString();

    customer = {
      updatedAt,
      password: hashedPassword,
    };

    await Customer.update({ ...customer }, { where: { id: userId } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Change Password Success.',
    });
    return response;
  } catch (e) {
    console.log(e.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
  }
};

module.exports = {
  getCustomers, getCustomersById, updateCustomers, deleteCustomers, changePasswordCustomers,
};
