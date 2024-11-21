const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { User, ArtPiece, Tag, ArtTag } = require('../../db/models'); 
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const { page = 1, size = 10, tags } = req.query;

    // Pagination
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    // Filter by tags (case-insensitive)
    let where = {};
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      where = {
        name: {
          [Op.iLike]: { [Op.any]: tagsArray.map((tag) => `%${tag}%`) },
        },
      };
    }

    // Query database
    const artPieces = await ArtPiece.findAndCountAll({
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: Tag,
          where,
          required: !!tags, // Include only if tags filter is applied
          attributes: ["name"],
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
        imageId: artPiece.imageId,
        title: artPiece.title,
        description: artPiece.description,
        available: artPiece.available,
        createdAt: artPiece.createdAt,
        updatedAt: artPiece.updatedAt,
        tags: artPiece.Tags.map((tag) => tag.name),
      })),
    };

    res.json(result);
    } catch (error) {
        next(error);
    }
})






module.exports = router;

