const { Favorite } = require('../../database/models');

/**
 * @swagger
 * tags:
 *  name: Favorite CRUD
 *  description: The favorite crud operations API
 * /favorite/{customerId}:
 *  get:
 *      summary: get favorite data by id
 *      tags: [favorite]
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
 *      tags: [favorite]
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
  const { productId, customerId } = req.body;
  const newFavorites = new Favorite({
    customerId,
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
}

const getFavoriteById = async (
  /** @type import("express").Request */
  req,
  /** @type import("express").Response */
  res,
) => {
  const { customerId } = req.params;
  console.log(customerId);
  try {
    if(!customerId){
      const response = res.status(400).json({
        status: 'failed',
        message: 'No customerId specified in url',
      });
      return response;
    }
    const favorite = await Favorite.findAll({ where: { customerId } });
    if(!favorite){
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

// const updateFavorite = async(
//   /** @type import('express').Request */
//   req,
//   /** @type import('express').Response */
//   res,
// ) => {
//   const {favoriteId} = req.params;
//   const {productId, customerId} = req.body;
//   try{
//     let favorite = await Favorite.findAll({where: { favoriteId }});
//     if(!favorite){
//       const response = res.status(400).json({
//         status: 'failed',
//         message: `Favorite with favoriteId: ${favoriteId} is not found.`,
//       })
//       return response;
//     }
//     const updatedAt = new Date().toISOString();
//     favorite = {
//       productId,
//       favoriteId,
//       customerId,
//       updatedAt,
//     };
//     await Favorite.update({...favorite}, {where: { favoriteId }});
//     const response = res.status(200).json({
//       status: 'success',
//       message: 'Update data successfull.',
//       data: favorite,
//     });
//     return response;
//   }catch(error){
//     const response = res.status(500).json({
//       status: 'failed',
//       message: 'Server unavailable.',
//     });
//     return response;
//   }
// };

const deleteFavorite = async(
  /** @type import('express').Request */
  req,
  /** @type import('express').Response */
  res,
) => {
  const {favoriteId} = req.params;
  try {
    const favorite = await Favorite.findAll({where: {id:favoriteId}});
    if(!favorite){
      const response = res.status(404).json({
        status: 'failed',
        message: `Favorite with favoriteId: ${favoriteId} is not found.`,
      });
      return response;
    }
    await Favorite.destroy({where: {id:favoriteId}});
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
  getFavoriteById, deleteFavorite, addFavorite
};