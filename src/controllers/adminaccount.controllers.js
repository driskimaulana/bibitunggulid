/**
* Programmer: D'Riski Maulana
* Filename: adminaccount.controllers.js
* Contact: driskimaulana@upi.edu
* Date: June 07, 2023
* Description: This is controllers for admin account table
* */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AdminAccount } = require('../../database/models');

require('dotenv').config();

const jwtSecret = process.env.JWT_TOKEN_KEY;

const createAdminAccount = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    fullName, userName, email, phone, role, password,
  } = req.body;

  try {
    let oldAdminAccount = await AdminAccount.findOne({ where: { userName } });
    if (oldAdminAccount) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Username already in use.',
      });
      return response;
    }
    oldAdminAccount = await AdminAccount.findOne({ where: { email } });
    if (oldAdminAccount) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Email already in use.',
      });
      return response;
    }
    oldAdminAccount = await AdminAccount.findOne({ where: { phone } });
    if (oldAdminAccount) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Phone already in use.',
      });
      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // create new admin with hashed password
    const newAdmin = await AdminAccount.create({
      fullName, userName, email, phone, role, password: hashedPassword,
    });

    const response = res.status(201).json({
      status: 'success',
      message: 'Login Success',
      data: newAdmin,
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

const signInAdmin = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userName, password } = req.body;
  try {
    // search for customers data in database
    let admin = await AdminAccount.findOne({
      where: { userName },
    });
    if (!admin) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Username is not found.',
      });
      return response;
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Password is not correct.',
      });
      return response;
    }

    const token = jwt.sign({ id: admin.id, role: admin.role }, jwtSecret);
    admin = {
      ...admin.dataValues,
      token,
    };

    const response = res.status(200).json({
      status: 'success',
      message: 'Login Success.',
      data: admin,
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

const getAllAdminAccount = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const admins = await AdminAccount.findAll();

    if (!admins) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No admin account data found.',
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      data: admins,
    });
    return response;
  } catch (err) {
    console.log(err.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavaiable.',
    });
    return response;
  }
};

const deleteAdminAccount = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.body;
  try {
    await AdminAccount.destroy({ where: { id } });
    const response = res.status(200).json({
      status: 'success',
      message: 'Data deleted succesfully.',
    });
    return response;
  } catch (error) {
    console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

module.exports = {
  createAdminAccount, signInAdmin, getAllAdminAccount, deleteAdminAccount,
};
