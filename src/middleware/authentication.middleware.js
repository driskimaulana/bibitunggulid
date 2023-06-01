/* eslint-disable consistent-return */
/**
* Programmer: D'Riski Maulana
* Filename: authentication.middleware.js
* Contact: driskimaulana@upi.edu
* Date: June 01, 2023
* Description: Middleware for authentication
* */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_TOKEN_KEY;

const middleware = (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {
  if (!req.headers.authorization) {
    const response = res.status(400).json({
      status: 'failed',
      message: 'Access Denied. Login Required',
    });

    return response;
  }

  console.log('middleware');

  //   get token from the authoriztaion headers
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedData = jwt.verify(token, jwtSecret);
    req.userId = decodedData?.id;

    console.log(req.userId);

    next();
  } catch (error) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable. Try again later.',
    });
    return response;
  }
};

module.exports = middleware;
