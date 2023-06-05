/**
* Programmer: D'Riski Maulana
* Filename: address.authentication.js
* Contact: driskimaulana@upi.edu
* Date: June 04, 2023
* Description: Controllers to handle request related to address table
* */

/**
 * @swagger
 * tags:
 *  name: ShipAddress
 *  description: The ShipAddress crud operations API
 * /shipaddress/:
 *  get:
 *      summary: get all ShipAddress by customer id
 *      tags: [ShipAddress ]
 *      responses:
 *          200:
 *              desciption: get ShipAddress data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ShipAddress'
 *          404:
 *              description: ShipAddress data is not found
 *          500:
 *              description: Service unavailable
 *  post:
 *      summary: Add new ship address to customers ShipAddress.
 *      tags: [ShipAddress ]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ShipAddress'
 *                  summary: The new ship address data
 *      responses:
 *          201:
 *              description: New shup address succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ShipAddress'
 *          400:
 *              description: Telphone is already used
 *          500:
 *              description: Service is unavailable
 * /shipaddress/{id}:
 *  delete:
 *      summary: delete ship address from customers ShipAddress using product id
 *      tags: [ShipAddress ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The ship address id
 *      responses:
 *          200:
 *              desciption: delete ship address data success
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 *  put:
 *      summary: update ship address details
 *      tags: [ShipAddress ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The ship address id
 *      responses:
 *          200:
 *              desciption: Ship address updated.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ShipAddress'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: ShipAddress data is not found
 *          500:
 *              description: Service unavailable
 */

const { ShipAddress, Customers } = require('../../database/models');

const getShipAddressesByCustomersId = async (
/** @type import("express").Request */ req,
  /** @type import("express").Response */ res,
) => {
  const id = req.userId;
  try {
    const customerData = await Customers.findOne({ where: { id } });

    if (!customerData) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Customer data is not found.',
      });
      return response;
    }

    const shipAddresses = await ShipAddress.findAll({ where: { customerId: id } });

    const response = res.status(200).json({
      status: 'success',
      message: 'Get data success.',
      data: shipAddresses,
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

const addNewCustomerShipAddress = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    name, phone, province, city, subDistrict, fullAddress,
    postalCode,
  } = req.body;
  try {
    const customerId = req.userId;

    const newShipAddress = await ShipAddress.create({
      name,
      phone,
      province,
      city,
      subDistrict,
      fullAddress,
      postalCode,
      customerId,
    });

    const response = res.status(201).json({
      status: 'success',
      message: 'Add new ship address success',
      data: newShipAddress,
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

const updateCustomersShipAddres = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    name, phone, province, city, subDistrict, fullAddress,
    postalCode,
  } = req.body;
  const customerId = req.userId;

  try {
    let shipAddress = await ShipAddress.findOne({ where: { id, customerId } });
    if (!shipAddress) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Data is not found.',
      });
      return response;
    }

    const updatedAt = new Date().toISOString();

    shipAddress = {
      name,
      phone,
      province,
      city,
      subDistrict,
      fullAddress,
      postalCode,
      updatedAt,
    };

    await ShipAddress.update({ ...shipAddress }, { where: { id } });
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

const deleteCustomerShipAddress = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const customerId = req.userId;

  try {
    const shipAddress = await ShipAddress.findOne({ where: { id, customerId } });
    if (!shipAddress) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Data is not found.',
      });
      return response;
    }

    await ShipAddress.destroy({ where: { id } });
    const response = res.status(200).json({
      status: 'success',
      message: 'Delete ship address data successful',
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
  getShipAddressesByCustomersId,
  addNewCustomerShipAddress,
  updateCustomersShipAddres,
  deleteCustomerShipAddress,
};
