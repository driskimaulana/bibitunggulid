/* eslint-disable no-undef */
/* eslint-disable radix */
const { Op } = require('sequelize');
const { Plants } = require('../../database/models');

/**
 * @swagger
 * tags:
 *  name: Plants
 *  description: The plants crud operations API
 * /plants/:
 *  get:
 *      summary: get plants data by id
 *      tags: [Plants]
 *      parameters:
 *          -   in: path
 *              name: customerId
 *              schema:
 *                  type: int
 *              summary: The plants id
 *      responses:
 *          200:
 *              desciption: get plants data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/plants'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: plants data is not found
 *          500:
 *              description: Service unavailable
 *  post:
 *      summary: create new plants
 *      tags: [Plants]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/plants'
 *      responses:
 *          200:
 *              desciption: Create new plants success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/plants'
 *          404:
 *              description: plants is not found
 *          400:
 *              description: plants data is not found
 *          500:
 *              description: Service unavailable
 * /plants/{id}:
 *  delete:
 *      summary: delete plants by id
 *      tags: [Plants]
 *      parameters:
 *          -   in: path
 *              name: favoriteId
 *              schema:
 *                  type: int
 *              summary: The plants id
 *      responses:
 *          200:
 *              desciption: delete plants data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/plants'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: plants data is not found
 *          500:
 *              description: Service unavailable
 */

const addNewPlants = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    localName, about, scienceName, family, kingdom, order,
  } = req.body;
  try {
    const newPlants = await Plants.create({
      localName,
      about,
      scienceName,
      family,
      kingdom,
      order,
    });

    const response = res.status(201).json({
      status: 'success',
      message: 'Add new plants success',
      data: newPlants,
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

const deletePlants = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.body;
  try {
    // const plant = await Plants.findOne({ where: { id } });
    // if (!plant) {
    //   const response = res.status(404).json({
    //     status: 'failed',
    //     message: 'Data is not found.',
    //   });
    //   return response;
    // }

    await Plants.destroy({ where: { id } });
    const response = res.status(200).json({
      status: 'success',
      message: 'Delete plant data successful',
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

const getPlants = async (
  /** @type import("express").Request */
  req,
  /** @type import("express").Response */
  res,
) => {
  const keyword = req.query.keyword || '';
  const page = parseInt(req.query.page) || 1; // Halaman saat ini
  const limit = parseInt(req.query.limit) || 10; // Jumlah item per halaman
  try {
    const { count, rows } = await Plants.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      where: {
        [Op.or]: [
          { scienceName: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });
    if (!rows) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'no plant found',
      });
      return response;
    }
    totalPages = Math.ceil(count / limit);
    const response = res.status(200).json({
      status: 'success',
      message: 'Fetch data successfull',
      currentPage: page,
      totalPages,
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

const updatePlants = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    localName, about, scienceName, family, kingdom, order,
  } = req.body;

  try {
    let plant = await Plants.findOne({ where: { id } });
    if (!plant) {
      const response = res.status(404).json({
        status: 'failed',
        message: 'Data is not found.',
      });
      return response;
    }

    const updatedAt = new Date().toISOString();

    plant = {
      localName,
      about,
      scienceName,
      family,
      kingdom,
      order,
      updatedAt,
    };

    await Plants.update({ ...plant }, { where: { id } });
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

module.exports = {
  addNewPlants, deletePlants, getPlants, updatePlants,
};
