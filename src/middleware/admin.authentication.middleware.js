/* eslint-disable consistent-return */
/**
* Programmer: D'Riski Maulana
* Filename: admin.authentication.middleware.js
* Contact: driskimaulana@upi.edu
* Date: June 01, 2023
* Description: Middleware for admin authentication
* */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_TOKEN_KEY;

const adminMiddleware = (
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

  //   get token from the authoriztaion headers
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedData = jwt.verify(token, jwtSecret);
    if (!decodedData?.role) {
      const response = res.status(500).json({
        status: 'failed',
        message: "You don't have enough permission or you are not admin.",
      });
      return response;
    }
    req.adminId = decodedData?.id;
    req.adminRole = decodedData?.role;

    next();
  } catch (error) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable. Try again later.',
    });
    return response;
  }
};

module.exports = adminMiddleware;
