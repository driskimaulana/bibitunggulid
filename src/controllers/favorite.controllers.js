const { Favorite, sequelize } = require('../../database/models');

/**
 * @swagger
 * tags:
 *  name: Favorite
 *  description: The favorite crud operations API
 * /favorite/{customerId}:
 *  get:
 *      summary: get favorite data by id
 *      tags: [Favorite ]
 *      parameters:
 *          -   in: path
 *              name: customerId
 *              schema:
 *                  type: int
 *              summary: The favorite id
 *      responses:
 *          200:
 *              desciption: get favorite data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Favorite'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Favorite data is not found
 *          500:
 *              description: Service unavailable
 * /favorite/{favoriteId}:
 *  delete:
 *      summary: delete favorite by id
 *      tags: [Favorite ]
 *      parameters:
 *          -   in: path
 *              name: favoriteId
 *              schema:
 *                  type: int
 *              summary: The favorite id
 *      responses:
 *          200:
 *              desciption: delete favorite data success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Favorite'
 *          400:
 *              description: No id is specified
 *          404:
 *              description: Favorite data is not found
 *          500:
 *              description: Service unavailable
 * /favorite/:
 *  post:
 *      summary: create new favorite
 *      tags: [Favorite ]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Favorite'
 *      responses:
 *          200:
 *              desciption: Create new favorite success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Favorite'
 *          404:
 *              description: Favorite is not found
 *          400:
 *              description: Favorite data is not found
 *          500:
 *              description: Service unavailable
 */

const addFavorite = async (
  /** @type import("express").Request */
  req,
  /** @type import("express").Response */
  res,
) => {
  const { productId } = req.body;

  const { userId } = req;

  const newFavorites = new Favorite({
    customerId: userId,
    productId,
  });

  try {
    await newFavorites.save();
    const response = res.status(201).json({
      status: 'success',
      data: {
        product: newFavorites,
      },
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

const getFavoriteById = async (
  /** @type import("express").Request */
  req,
  /** @type import("express").Response */
  res,
) => {
  const customerId = req.userId;
  try {
    if (!customerId) {
      const response = res.status(400).json({
        status: 'failed',
        message: 'No customerId specified in url',
      });
      return response;
    }

    const favorite = await sequelize.query(`SELECT "Favorites".id, "Products".id as "productId", "Products"."productName", 
    "Products"."unitPrice", "Products".pictures
    FROM "Products" 
    LEFT JOIN "Favorites" ON "Products".id = "Favorites"."productId" 
    WHERE "Favorites"."customerId"=${req.userId};
    `);

    // const favorite = await Favorite.findAll({ where: { customerId } });
    if (!favorite) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Favorite with customerId: ${customerId} is not found.`,
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      message: 'Get data success.',
      data: favorite,
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

const deleteFavorite = async (
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
) => {
  const { favoriteId } = req.params;
  const { userId } = req;
  try {
    const favorite = await Favorite.findAll({
      where:
       { productId: favoriteId, customerId: userId },
    });
    if (!favorite) {
      const response = res.status(404).json({
        status: 'failed',
        message: `Favorite with favoriteId: ${favoriteId} is not found.`,
      });
      return response;
    }
    await Favorite.destroy({ where: { productId: favoriteId, customerId: userId } });
    console.log(favorite);
    const response = res.status(400).json({
      status: 'success',
      message: 'Data deleted successfully.',
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
  getFavoriteById, deleteFavorite, addFavorite,
};
