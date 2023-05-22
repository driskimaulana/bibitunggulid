/* eslint-disable no-unused-vars */
/**
* Programmer: D'Riski Maulana
* Filename: authentication.controllers.js
* Contact: driskimaulana@upi.edu
* Date: 31 March 2023
* Description: Controllers to handle request related to authentication
* */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const models = require('../../database/models');
/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: The authentication API
 * /authentication/signIn:
 *  post:
 *      summary: validate Customer login details
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'
 *      responses:
 *          200:
 *              desciption: Sign in success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Customer'
 *          404:
 *              description: Customer is not found
 *          400:
 *              description: Incorrect password
 *          500:
 *              description: Service unavailable
 * /authentication/signUp:
 *  post:
 *      summary: Create new account
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Customer'
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
 */

const jwtSecret = process.env.JWT_TOKEN_KEY;

const signUp = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    fullName, phone, email, password,
  } = req.body;

  try {
    // console.log(db);
    // check if email is already exist in database
    let oldUser = await models.Customers.findOne({ where: { email } });
    if (oldUser) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Email already in use.',
      });
      return response;
    }

    // check if phone number already exist in database
    oldUser = await models.Customers.findOne({ where: { phone } });
    if (oldUser) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Phone number already in use.',
      });
      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user with hashed password
    let newCustomer = await models.Customers.create({
      phone, email, password: hashedPassword, fullName,
    });

    // generate jwt token
    const token = jwt.sign({
      id: newCustomer.id,
      email,
    }, jwtSecret);

    newCustomer = {
      ...newCustomer.dataValues,
      token,
    };

    const response = res.status(201).json({
      status: 'success',
      message: 'Login Success',
      data: newCustomer,
    });
    return response;
  } catch (e) {
    console.log(e.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailble.',
    });
    return response;
  }
};

const signIn = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { email, password } = req.body;
  try {
    // search for customers data in database
    let customer = await models.Customers.findOne({
      where: { email },
    });
    if (!customer) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Email is not found.',
      });
      return response;
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, customer.password);
    if (!isPasswordCorrect) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Password is not correct.',
      });
      return response;
    }

    const token = jwt.sign({ id: customer.id, email: customer.email }, jwtSecret);
    customer = {
      ...customer.dataValues,
      token,
    };

    const response = res.status(200).json({
      status: 'success',
      message: 'Login Success.',
      data: customer,
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

module.exports = { signUp, signIn };
