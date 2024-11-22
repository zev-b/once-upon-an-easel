const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { User, ArtPiece, Tag, ArtTag } = require('../../db/models'); 
const router = express.Router();




//#  GET all art-pieces with pagination and optional filtering by tag
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
            artPieces: artPieces.rows.map((art) => ({
                id: art.id,
                userId: art.userId,
                user: {
                    firstName: art.User.firstName,
                    lastName: art.User.lastName,
                },
                imageId: art.imageId,
                title: art.title,
                description: art.description,
                available: art.available,
                createdAt: art.createdAt,
                updatedAt: art.updatedAt,
                tags: art.Tags.map((tag) => ({
                    id: tag.id,
                    name: tag.name
                })),
            })),
        };

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


//# GET current user's art-pieces
router.get('/current',restoreUser, requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id;

    try {
        const userArt = await ArtPiece.findAll({
            where: { userId: currentUserId },
            include: [
                {
                    model: Tag,
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
            ],
        });
        
        const result = userArt.map((art) => ({
            id: art.id,
            userId: art.userId,
            imageId: art.imageId,
            title: art.title,
            description: art.description,
            available: art.available,
            createdAt: art.createdAt,
            updatedAt: art.updatedAt,
            tags: art.Tags.map((tag) => ({
                id: tag.id,
                name: tag.name,
            })),
        }));

        res.status(200).json({ artPieces: result });
    } catch (error) {
        next(error);
    }
});

//# GET art by artId
router.get('/:artId',restoreUser, requireAuth, async (req, res, next) => {
    try {
        const artById = await ArtPiece.findOne({
            where: { id: req.params.artId },
            include: [
                {
                    model: Tag,
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
                {
                    model: User, 
                    attributes: ["firstName", "lastName"],
                },
            ],
        });

        if (!artById) {
            return res.status(404).json({ message: "Art couldn't be found" })
        }

        const result = {
            id: artById.id,
            userId: artById.userId,
            user: {
                firstName: artById.User.firstName,
                lastName: artById.User.lastName,
            },
            imageId: artById.imageId,
            title: artById.title,
            description: artById.description,
            available: artById.available,
            createdAt: artById.createdAt,
            updatedAt: artById.updatedAt,
            tags: artById.Tags.map((tag) => ({
                id: tag.id,
                name: tag.name,
            })),
        };
        
        res.status(200).json({ art: result });
    } catch (error) {
        next(error);
    }
});


//# express-validator for artPiece
const validateArtPiece = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Title is required.')
        .isLength({ max: 50 })
        .withMessage('Title cannot exceed 50 characters.'),
    check('description')
        .optional()
        .isLength({ min: 0, max: 315 })
        .withMessage('Description cannot exceed 315 characters.'),
    check('imageId')
        .exists({ checkFalsy: true })
        .withMessage('An image is required.')
        .isString()
        .withMessage('Image ID must be a valid string.'),
    check('tags')
        .isArray()
        .optional()
        .withMessage('Tags must be an array of strings.')
        .custom((tags) => tags.every(tag => typeof tag === 'string'))
        .withMessage('Each tag must be a string.')
];

//# POST art img-upload with S3
router.post('/', restoreUser, requireAuth, async (req, res, next) => {

});


module.exports = router;

