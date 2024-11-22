const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { User, ArtPiece, Tag, ArtTag } = require('../../db/models'); 
const router = express.Router();



//#  
router.get('/', async (req, res, next) => {
    try {
        const queryErrors = {};

        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        
        if (page < 1) {
            queryErrors.page = 'Page must be greater than or equal to 1';
        }

        if (size < 1 || size > 20) {
            queryErrors.size = 'Size must be between 1 and 20';
        }

        if (Object.keys(queryErrors).length) {
            return res.status(400).json({ message: 'Bad Request', errors: queryErrors });
        }

        const limit = size || 20;
        const offset = ((page || 1) - 1) * limit;
        
        let where = {};
        if (req.query.tagIds) {
            const tagIdArray = Array.isArray(req.query.tagIds) ? req.query.tagIds.map(Number) : [Number(req.query.tagIds)];
            where = {
                id: {
                [Op.in]: tagIdArray,
                },
            };
        }
    
        const artPieces = await ArtPiece.findAndCountAll({
            limit,
            offset,
            distinct: true,
            include: [
                {
                    model: Tag,
                    where,
                    required: !!req.query.tagIds, //! converts the array to a bool, excludes where clause, if not filtering by tags
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
            page: page || 1,
            size: limit,
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

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})


module.exports = router;

