/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
// const { Product } = require('../../database/models');
const { Product } = require('../../database/models');

const uuidv4 = require('uuid').v4;
const { once } = require('events');
const processFileMiddleware = require('../middleware/uploadfile.middleware');

require('dotenv').config();

const storage = new Storage({ projectId: 'bibitunggulid', credentials: JSON.parse(process.envGSTORAGE_SERVICE_KEY) });
// const storage = new Storage({ keyFilename: 'gstorage-service-account.json' });

// const storage = new Storage({ credentials: JSON.parse(process.env.GSTORAGE_SERVICE_KEY) });
const bucket = storage.bucket('bibitunggulid-public');

/**
 * @swagger
 * tags:
 *  name: Product CRUD
 *  description: The product crud operations API
 * /product/:
 *  get:
 *      summary: get all product data
 *      tags: [Product CRUD]
 *      responses:
 *          200:
 *              desciption: get product data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 *  post:
 *      summary: create new product
 *      tags: [product]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              desciption: Create product success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product is not found
 *          400:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 * /product/{id}:
 *  get:
 *      summary: get product data by id
 *      tags: [Product CRUD]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The product id
 *      responses:
 *          200:
 *              desciption: get product data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 *  delete:
 *      summary: delete product by id
 *      tags: [Product CRUD]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The product id
 *      responses:
 *          200:
 *              desciption: delete product data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 *  put:
 *      summary: update product data
 *      tags: [Product CRUD]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The product id
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              desciption: get product data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Product data is not found
 *          500:
 *              description: Service unavailable
 */

const getProduct = async (
  /** @type import("express").Request */
  req,
  /** @type import("express").Response */
  res,
) => {
  try {
    const product = await Product.findAll();
    if (!product) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'no product found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      data: product,
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

const getProductById = async (
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
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
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Product with id: ${id} is not found.`,
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Get data success.',
      data: product,
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

const updateProduct = async (
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
) => {
  const { id } = req.params;
  const {
    supplierId,
    productName,
    productDescription,
    categoryId,
    unitPrice,
    unitWeight,
    unitInStock,
    isAvailable,
    pictures,
  } = req.body;

  try {
    let product = await Product.findOne({ where: { id } });
    if (!product) {
      const response = res.status(400).json({
        status: 'failed',
        message: `Product with id: ${id} is not found.`,
      });
      return response;
    }
    const updatedAt = new Date().toISOString();
    product = {
      supplierId,
      productName,
      productDescription,
      categoryId,
      unitPrice,
      unitWeight,
      unitInStock,
      isAvailable,
      pictures,
      updatedAt,
    };
    await Product.update({ ...product }, { where: { id } });
    const response = res.status(200).json({
      status: 'success',
      message: 'Update data successfull',
      data: product,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

const deleteProduct = async (
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Product with id: ${id} is not found.`,
      });
      return response;
    }
    await product.destroy({ where: { id } });
    const response = res.status(400).json({
      status: 'success',
      message: 'Data deleted successfully.',
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

const addNewProduct = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
// eslint-disable-next-line consistent-return
) => {
  try {
    await processFileMiddleware(req, res);
    const {
      supplierId,
      productName,
      productDescription,
      categoryId,
      unitPrice,
      unitWeight,
      isAvailable,
    } = req.body;

    if (!req.files) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'No image send.',
      });
      return response;
    }

    // eslint-disable-next-line prefer-const
    let pictures = [];

    // eslint-disable-next-line guard-for-in
    for (const i in req.files) {
      // create new blob in the bucket and upload the file data
      const blob = bucket.file(`product-images/${uuidv4()}.${req.files[i].originalname.split('.')[1]}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        console.log(err.message);
        const response = res.status(500).json({
          status: 'failed',
          message: 'Upload data failed',
        });
        return response;
      });

      // eslint-disable-next-line consistent-return
      blobStream.on('finish', (data) => {
      // Create public URL for the file
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        );
        // console.log(`pu:${blob.name}`);
        pictures.push(publicUrl);
        // console.log(pictures);
      });

      blobStream.end(req.files[i].buffer);

      // wait until the upload is finish
      await once(blobStream, 'finish');
      // eslint-disable-next-line eqeqeq
      if (i == req.files.length - 1) {
        // console.log(pictures);

        const newProduct = await Product.create({
          supplierId,
          productName,
          productDescription,
          categoryId,
          unitPrice,
          unitWeight,
          isAvailable,
          pictures,
        });
        console.log(newProduct);

        const response = res.status(200).json({
          status: 'success',
          message: 'Add new product success.',
          data: newProduct,
        });
        return response;
      }
    }
  } catch (error) {
    console.log(error.message);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavaiable.',
    });
    return response;
  }
};

// const addNewProduct = async (
//   /** @type import('express').Request */
//   req,
//   /** @type import('express').Response */
//   res,
// ) => {
//   const {
//     supplierId,
//     productName,
//     productDescription,
//     categoryId,
//     unitPrice,
//     unitWeight,
//     unitInStock,
//     isAvailable,
//     pictures,
//   } = req.body;
//   // const createdAt = new Date().toISOString();
//   // const updatedAt = new Date().toISOString();
//   // const newProduct = Product({
//   //   supplierId,
//   //   productName,
//   //   productDescription,
//   //   categoryId,
//   //   unitPrice,
//   //   unitWeight,
//   //   unitInStock,
//   //   isAvailable,
//   //   pictures,
//   //   createdAt,
//   //   updatedAt,
//   // });

//   console.log(req.body);

//   try {
//     // await newProduct.save();
//     const response = res.status(200).json({
//       status: 'success',
//       data: {
//         product: 'success',
//       },
//     });
//     return response;
//   } catch (error) {
//     const response = res.status(500).json({
//       status: 'fail',
//       message: 'Server unavailable.',
//     });
//     return response;
//   }
// };

module.exports = {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addNewProduct,
};
