const { Favorite } = require('../../database/models/favorite');

/**
 * @swagger
 * tags:
 *  name: Favorite CRUD
 *  description: The favorite crud operations API
 * /favorite/{favoriteId}:
 *  get:
 *      summary: get favorite data by id
 *      tags: [favorite]
 *      parameters:
 *          -   in: path
 *              name: id
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
 *  delete:
 *      summary: delete favorite by id
 *      tags: [favorite]
 *      parameters:
 *          -   in: path
 *              name: id
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
 *  put:
 *      summary: update favorite data
 *      tags: [favorite]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: int
 *              summary: The favorite id
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Favorite'
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
 *  post:
 *      summary: create new favorite
 *      tags: [favorite]
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
  const { favoriteId } = req.params;
  const { productId, customerId } = req.body;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newFavorites = Favorite({
    favoriteId,
    customerId,
    productId,
    createdAt,
    updatedAt,
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
}

const getFavoriteById = async (
  /** @type import("express").Request */
  req,
  /** @type import("express").Response */
  res,
) => {
  const { favoriteId } = req.params;
  try {
    if(!favoriteId){
      const response = res.status(400).json({
        status: 'failed',
        message: 'No favoriteId specified in url',
      });
      return response;
    }
    const favorite = await Favorite.findAll({ where: { favoriteId } });
    if(!favorite){
        const response = res.status(404).json({
            status: 'failed',
            message: `Favorite with favoriteId: ${favoriteId} is not found.`,
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

const updateFavorite = async(
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
) => {
  const {favoriteId} = req.params;
  const {productId, customerId} = req.body;
  try{
    let favorite = await Favorite.findAll({where: { favoriteId }});
    if(!favorite){
      const response = res.status(400).json({
        status: 'failed',
        message: `Favorite with favoriteId: ${favoriteId} is not found.`,
      })
      return response;
    }
    const updatedAt = new Date().toISOString();
    favorite = {
      productId,
      favoriteId,
      customerId,
      updatedAt,
    };
    await Favorite.update({...favorite}, {where: { favoriteId }});
    const response = res.status(200).json({
      status: 'success',
      message: 'Update data successfull.',
      data: favorite,
    });
    return response;
  }catch(error){
    const response = res.status(500).json({
      status: 'failed',
      message: 'Server unavailable.',
    });
    return response;
  }
};

const deleteFavorite = async(
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
) => {
  const {favoriteId} = req.params;
  try {
    const favorite = await Favorite.findAll({where: {favoriteId}});
    if(!favorite){
      const response = res.status(404).json({
        status: 'failed',
        message: `Favorite with productId: ${productId} is not found.`,
      });
      return response;
    }
    await favorite.destroy({where: {productId}});
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

module.exports = {
  getFavoriteById, updateFavorite, deleteFavorite, addFavorite
};