const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { User, ArtPiece, Tag, ArtTag } = require('../../db/models'); 
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const { page = 1, size = 20, tagIds } = req.query;

   
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    
    let where = {};
    if (tagIds) {
      const tagIdArray = Array.isArray(tagIds) ? tagIds.map(Number) : [Number(tagIds)];
      where = {
        id: {
          [Op.in]: tagIdArray,
        },
      };
    }

   
    const artPieces = await ArtPiece.findAndCountAll({
      limit,
      offset,
      include: [
        {
            model: Tag,
            where,
            required: !!tagIds, //! converts the array to a bool, excludes where clause, if not filtering by tags
            attributes: ["id", "name"],
            through: { attributes: [] },
        },
        {
            model: User, 
            attributes: ["firstName", "lastName"],
        },
      ],
    });

    // response
    const result = {
      page: parseInt(page),
      size: parseInt(size),
      total: artPieces.count,
      artPieces: artPieces.rows.map((artPiece) => ({
        id: artPiece.id,
        userId: artPiece.userId,
        user: {
            firstName: artPiece.User.firstName,
            lastName: artPiece.User.lastName,
        },
        imageId: artPiece.imageId,
        title: artPiece.title,
        description: artPiece.description,
        available: artPiece.available,
        createdAt: artPiece.createdAt,
        updatedAt: artPiece.updatedAt,
        tags: artPiece.Tags.map((tag) => ({
            id: tag.id,
            name: tag.name
        })),
      })),
    };

    res.json(result);
    } catch (error) {
        next(error);
    }
})






module.exports = router;

