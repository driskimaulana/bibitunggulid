const { Product, Plants } = require('../../database/models');
const processFileMiddleware = require('../middleware/uploadfile.middleware');
const uploadImageToBucket = require('../services/uploadimage.services');
const { Op } = require('sequelize');

require('dotenv').config();
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: The product crud operations API
 * /product/:
 *  get:
 *      summary: get all product data
 *      tags: [Product ]
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
 *      tags: [Product ]
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
 *      tags: [Product ]
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
 *      tags: [Product ]
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
 *      tags: [Product ]
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
  const keyword = req.query.keyword || '';
  const page = parseInt(req.query.page) || 1; //Halaman saat ini
  const limit = parseInt(req.query.limit) || 5; //Jumlah item per halaman
  const keyFilter = req.query.keyfilter || '';
  let whereCondition = {
    [Op.or]: [
      { productName: { [Op.iLike]: `%${keyword}%` } },
    ],
  };
  let order = [['id', 'ASC']];
  if (keyFilter === 'terbaru'){
    whereCondition = {
      ...whereCondition,
      createdAt: {[Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)}
    }
  } 
  else if (keyFilter === 'terlaris'){
    order = [['id', 'DESC']];
  }
  try {
    const {count, rows} = await Product.findAndCountAll(
      {
        offset: (page - 1) * limit,
        limit: limit,
        where: whereCondition,
        order: order,
      }
    );
    const totalPages = Math.ceil(count / limit);
    if (!rows) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'no product found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      currentPages: page,
      totalPages: totalPages,
      totalCount: count,
      data: rows,
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
// eslint-disable-next-line consistent-return
) => {
  try {
    await processFileMiddleware(req, res);
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
      oldPictures,
    } = req.body;

    const { adminId } = req;

    let product = await Product.findOne({ where: { id } });
    if (!product) {
      const response = res.status(400).json({
        status: 'failed',
        message: `Product with id: ${id} is not found.`,
      });
      return response;
    }

    const updatedAt = new Date().toISOString();

    if (req.files.length > 0) {
      // eslint-disable-next-line prefer-const
      let pictures = [];

      // eslint-disable-next-line guard-for-in
      for (const i in req.files) {
        const uploadResults = await uploadImageToBucket(req.files[i], 'product-images');

        if (uploadResults.status === 'failed') {
          const response = res.status(505).json({
            status: 'failed',
            message: uploadResults.message,
          });
          return response;
        }

        pictures.push(uploadResults.publicUrl);

        // eslint-disable-next-line eqeqeq
        if (i == req.files.length - 1) {
          let slug;
          if (productName) {
            slug = `${productName.toLowerCase().replace(/ /g, '-')}-${product.supplierId}`;
          }

          let oldPic = [];

          if (oldPictures) {
            if (Array.isArray(oldPictures)) {
              oldPic = [...oldPictures];
            } else {
              oldPic.push(oldPictures);
            }
          }

          oldPic = [...oldPic, ...pictures];

          product = {
            supplierId,
            productName,
            productDescription,
            categoryId,
            unitPrice,
            unitWeight,
            unitInStock,
            isAvailable,
            adminId,
            slug,
            pictures: oldPictures ? [...oldPic]
              : [...product.pictures, ...pictures],
            updatedAt,
          };
          pictures = [];
          oldPic = [];

          await Product.update({ ...product }, { where: { id } });

          const response = res.status(200).json({
            status: 'success',
            message: 'Add new product success.',
            data: product,
          });
          return response;
        }
      }
    } else {
      let slug;
      if (productName) {
        slug = `${productName.toLowerCase().replace(/ /g, '-')}-${product.supplierId}`;
      }

      product = {
        supplierId,
        productName,
        productDescription,
        categoryId,
        unitPrice,
        unitWeight,
        unitInStock,
        isAvailable,
        adminId,
        slug,
        pictures: oldPictures,
        updatedAt,
      };

      await Product.update({ ...product }, { where: { id } });

      const response = res.status(200).json({
        status: 'success',
        message: 'Add new product success.',
        data: product,
      });
      return response;
    }
  } catch (err) {
    console.log(err.message);
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
    const response = res.status(200).json({
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
      planId,
      unitWeight,
      isAvailable,
    } = req.body;

    const { adminId } = req;

    let getId;
    if (planId) {
      const responseId = await Plants.findOne({ attributes: ['id'], where: { scienceName: planId } });
      getId = responseId.dataValues.id;
      console.log(getId);
    }

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
      const uploadResults = await uploadImageToBucket(req.files[i], 'product-images');
      console.log('test');
      if (uploadResults.status === 'failed') {
        const response = res.status(505).json({
          status: 'failed',
          message: uploadResults.message,
        });
        return response;
      }

      pictures.push(uploadResults.publicUrl);

      // eslint-disable-next-line eqeqeq
      if (i == req.files.length - 1) {
        const slug = `${productName.toLowerCase().replace(' ', '-')}-${supplierId}`;

        const newProduct = await Product.create({
          supplierId,
          productName,
          productDescription,
          categoryId,
          unitPrice,
          unitWeight,
          isAvailable,
          pictures,
          adminId,
          slug,
          planId: getId,
        });

        const response = res.status(200).json({
          status: 'success',
          message: 'Add new product success.',
          data: newProduct,
        });
        return response;
      }
    }
  } catch (error) {
    console.error(error);
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavaiable.',
    });
    return response;
  }
};

module.exports = {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addNewProduct,
};
