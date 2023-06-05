/**
* Programmer: D'Riski Maulana
* Filename: category.controllers.js
* Contact: driskimaulana@upi.edu
* Date: June 03, 2023
* Description: This is the crud controllers for category table
* */

/**
 * @swagger
 * tags:
 *  name: categories CRUD
 *  description: The category crud operations API
 * /category/:
 *  get:
 *      summary: get all categories data
 *      tags: [categories CRUD]
 *      responses:
 *          200:
 *              desciption: get categories data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          404:
 *              description: category data is not found
 *          500:
 *              description: Service unavailable
 *  post:
 *      summary: Create new categoy
 *      tags: [categories CRUD]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          201:
 *              description: New category succesfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          400:
 *              description: Telphone is already used
 *          500:
 *              description: Service is unavailable
 * /category/{id}:
 *  delete:
 *      summary: delete category by id
 *      tags: [categories CRUD]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The categories id
 *      responses:
 *          200:
 *              desciption: delete categories data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/category'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: category data is not found
 *          500:
 *              description: Service unavailable
 *  put:
 *      summary: update category data
 *      tags: [categories CRUD]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The categories id
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          200:
 *              desciption: get categories data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/category'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: category data is not found
 *          500:
 *              description: Service unavailable
 */

const { Category } = require('../../database/models');

const getAllCategory = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const categories = await Category.findAll();

    if (!categories) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'No categories data found.',
      });
      return response;
    }

    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      data: categories,
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

const addNewCategory = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    categoryName, description,
  } = req.body;

  try {
    // console.log(db);
    // check if email is already exist in database
    const oldCategory = await Category.findOne({ where: { categoryName } });
    if (oldCategory) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'Category is already in the database.',
      });
      return response;
    }

    // create new category
    const newCategory = await Category.create({
      categoryName, description,
    });

    const response = res.status(201).json({
      status: 'success',
      message: 'Add new category success.',
      data: newCategory,
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

const updateCategory = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    categoryName, description,
  } = req.body;

  try {
    let category = await Category.findOne({ where: { id } });
    if (!category) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Category with id: ${id} is not found.`,
      });
      return response;
    }
    const updatedAt = new Date().toISOString();

    category = {
      categoryName, description, updatedAt,
    };

    await Category.update({ ...category }, { where: { id } });

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

const deleteCategory = async (
/** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.body;
  try {
    // const category = await Category.findOne({ where: { id } });
    // if (!category) {
    //   const response = res.status(404).json({
    //     status: 'failed',
    //     message: `Category with id: ${id} is not found.`,
    //   });
    //   return response;
    // }

    await Category.destroy({ where: { id } });
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
  getAllCategory, addNewCategory, updateCategory, deleteCategory,
};