const Product = require('../../database/models').Product;

/**
 * @swagger
 * tags:
 *  name: Product CRUD
 *  description: The product crud operations API
 * /product/:
 *  get:
 *      summary: get all product data
 *      tags: [product]
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
 * /product/{id}:
 *  get:
 *      summary: get product data by id
 *      tags: [product]
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
 *      tags: [product]
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
 *      tags: [product]
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

const getProduct = async(
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
        return response
    } catch (err) {
        console.log(err.message);
        const response = res.status(500).json({
            status: 'failed',
            message: 'Service unavailable.',
        });
        return response;
    }
}

const getProductById = async(
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
}

const updateProduct = async(
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
        pictures
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
        await Product.update({...product }, { where: { id } });
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
}

const deleteProduct = async(
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
}

module.exports = {
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};