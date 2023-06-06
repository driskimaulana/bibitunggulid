/* eslint-disable no-unused-vars */
/**
* Programmer: D'Riski Maulana
* Filename: suppliers.controllers.js
* Contact: driskimaulana@upi.edu
* Date: June 03, 2023
* Description: This is the crud controllers for Suppliers table
* */

/**
 * @swagger
 * tags:
 *  name: Suppliers
 *  description: The Supplier crud operations API
 * /supplier/:
 *  get:
 *      summary: get all Suppliers data
 *      tags: [Suppliers ]
 *      responses:
 *          200:
 *              desciption: get Suppliers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Supplier'
 *          404:
 *              description: Supplier data is not found
 *          500:
 *              description: Service unavailable
 *  post:
 *      summary: Create new Supplier
 *      tags: [Suppliers ]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          201:
 *              description: New Supplier succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          400:
 *              description: Telphone is already used
 *          500:
 *              description: Service is unavailable
 * /supplier/{id}:
 *  get:
 *      summary: get supplier detail data by id
 *      tags: [Suppliers ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The supplier id
 *      responses:
 *          200:
 *              desciption: get suppliers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Supplier'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Supplier data is not found
 *          500:
 *              description: Service unavailable
 *  delete:
 *      summary: delete Supplier by id
 *      tags: [Suppliers ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The Suppliers id
 *      responses:
 *          200:
 *              desciption: delete Suppliers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Supplier'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Supplier data is not found
 *          500:
 *              description: Service unavailable
 *  put:
 *      summary: update Supplier data
 *      tags: [Suppliers ]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The Suppliers id
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Supplier'
 *      responses:
 *          200:
 *              desciption: get Suppliers data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Supplier'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Supplier data is not found
 *          500:
 *              description: Service unavailable
 */

const { Supplier } = require('../../database/models');
const processFileMiddleware = require('../middleware/uploadfile.middleware');
const uploadImageToBucket = require('../services/uploadimage.services');

const getAllSuppliers = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const suppliers = await Supplier.findAll();

    if (!suppliers) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No suppliers data found.',
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      data: suppliers,
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

const getSupplierDetailsById = async (
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
    const supplier = await Supplier.findOne({ where: { id } });
    if (!supplier) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Suppliers with id: ${id} is not found.`,
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Get data success.',
      data: supplier,
    });

    return response;
  } catch (err) {
    console.log(err.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Service unavailable.',
    });
    return response;
  }
};

const addNewSupplier = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    await processFileMiddleware(req, res);
    const {
      companyName, contactName, email, bio, isActive, contactPhone, province, city,
      subDistrict, fullAddress, postalCode,
    } = req.body;

    console.log(req.files);

    let publicUrl = '';

    if (!req.files) {
      publicUrl = 'https://storage.googleapis.com/bibitunggulid-public/supplier-logo-images/default-logo.png';
    } else {
      const uploadImage = await uploadImageToBucket(req.files[0]);
      if (uploadImage.status === 'success') {
        publicUrl = uploadImage.publicUrl;
      } else {
        const response = res.status(500).json({
          status: 'failed',
          message: uploadImage.message,
        });
        return response;
      }
    }

    const newSupplier = await Supplier.create({
      companyName,
      contactName,
      email,
      bio,
      isActive,
      contactPhone,
      province,
      city,
      subDistrict,
      fullAddress,
      postalCode,
      logo: publicUrl,
    });

    const response = res.status(200).json({
      status: 'success',
      message: 'Add new supplier success.',
      data: newSupplier,
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

const updateSupplier = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;

  try {
    let supplier = await Supplier.findOne({ where: { id } });
    if (!supplier) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Supplier with id: ${id} is not found.`,
      });
      return response;
    }

    await processFileMiddleware(req, res);
    const {
      companyName, contactName, email, bio, isActive, contactPhone, province, city,
      subDistrict, fullAddress, postalCode,
    } = req.body;

    console.log(req.body);

    let publicUrl;

    if (req.files.length !== 0) {
      const uploadImage = await uploadImageToBucket(req.files[0]);
      if (uploadImage.status === 'success') {
        publicUrl = uploadImage.publicUrl;
      } else {
        const response = res.status(500).json({
          status: 'failed',
          message: uploadImage.message,
        });
        return response;
      }
    }

    const updatedAt = new Date().toISOString();

    supplier = {
      companyName,
      contactName,
      email,
      bio,
      isActive,
      contactPhone,
      province,
      city,
      subDistrict,
      fullAddress,
      postalCode,
      logo: publicUrl,
      updatedAt,
    };

    console.log(supplier);

    await Supplier.update({ ...supplier }, { where: { id } });

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

const deleteSuppliers = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const supplier = await Supplier.findOne({ where: { id } });
    if (!supplier) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Suppliers with id: ${id} is not found.`,
      });
      return response;
    }

    await Supplier.destroy({ where: { id } });
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
  getAllSuppliers,
  addNewSupplier,
  deleteSuppliers,
  updateSupplier,
  getSupplierDetailsById,
};
