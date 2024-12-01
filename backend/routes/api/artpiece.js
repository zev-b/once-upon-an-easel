const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { User, ArtPiece, Tag, ArtTag, Sequelize } = require('../../db/models'); 
const { singleMulterUpload, singlePublicFileUpload } = require('../../utils/awsS3');
const router = express.Router();


//#  GET all art-pieces with pagination and optional filtering by tag
router.get('/', async (req, res, next) => {
    try {
        // const queryErrors = {};

        // const page = parseInt(req.query.page);
        // const size = parseInt(req.query.size);
        
        // if (page < 1) {
        //     queryErrors.page = 'Page must be greater than or equal to 1';
        // }

        // if (size < 1 || size > 20) {
        //     queryErrors.size = 'Size must be between 1 and 20';
        // }

        // if (Object.keys(queryErrors).length) {
        //     return res.status(400).json({ message: 'Bad Request', errors: queryErrors });
        // }

        // const limit = size || 20;
        // const offset = ((page || 1) - 1) * limit;
        

        let whereTags = {};
        if (req.query.tagIds) {
            const tagIdArray = Array.isArray(req.query.tagIds) ? req.query.tagIds.map(Number) : [Number(req.query.tagIds)];
            where = {
                id: {
                    [Op.in]: tagIdArray,
                },
            };
        }
        //! TODO: Add filtering options by artist first and last name
        //! keep in mind searching with typo in *part* of name...
        let whereUser = {};
        if (req.query.artistName) {
            const artistName = req.query.artistName.toLowerCase();
            whereUser = {
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('firstName')),
                        'LIKE',
                        `%${artistName.toLowerCase()}%`
                    ),
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('lastName')),
                        'LIKE',
                        `%${artistName.toLowerCase()}%`
                    ),
                ]
            }
        }
    
        const artPieces = await ArtPiece.findAndCountAll({
            // limit,
            // offset,
            distinct: true,
            include: [
                {
                    model: Tag,
                    where: whereTags,
                    required: !!req.query.tagIds, //! converts the array to a boolean. Excludes "where"-clause, if not filtering by tags
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
                {
                    model: User, 
                    attributes: ["firstName", "lastName"],
                    where: whereUser,
                },
            ],
        });
        
        const result = {
            // page: page || 1,
            // size: limit,
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
                tags: art.Tags.map((tag) => tag.id),
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
            tags: art.Tags.map((tag) => tag.id),
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
            tags: artById.Tags.map((tag) => tag.id),
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
    // check('image')
    //     .exists({ checkFalsy: true })
    //     .withMessage('An image is required.'),
    check('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array of strings.')
        .custom((tags) => tags.every(tag => typeof tag === 'string'))
        .withMessage('Each tag must be a string.')
];

//# POST art img-upload with S3
router.post('/', singleMulterUpload('image'), validateArtPiece, restoreUser, requireAuth, async (req, res, next) => {

    const { title, description } = req.body;
    const userId = req.user.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        const normalizedErrors = {};
    
        for (const error of errorArray) {
            if (!normalizedErrors[error.param]) {
                normalizedErrors[error.param] = [];
            }
            normalizedErrors[error.param].push(error.msg);
        }
        return res.status(400).json({errors: normalizedErrors})
    }

    let imageUrl;

    try {
        if (!req.file) {
            return res.status(400).json({ errors: { image: ["An image is required."] } });
        } 

       if (req.file) {
           imageUrl = await singlePublicFileUpload(req.file);
       }

       const newArt = await ArtPiece.create({
        userId,
        title,
        description,
        imageId: imageUrl,
       });

    //^ Deal with Tags here: -> (Nope, in a separate route)
    //+ for each tag in the array...
    //+ format ea tag: lowercase, trim, replace spaces with hyphens
    // const reqTags = await Promise.all(
    //     tags.map(async tagName => {
    //         const [tag] = await Tag.findOrCreate({
    //             where: { name: tagName.toLowerCase() }, // case
    //             defaults: { name: tagName.toLowerCase() }, // Additional fields can go here
    //         });
    //         return tag;
    //     })
    // );
        // console.log("\n ===Img Url==== \n", imageUrl)
      
       res.status(201).json({ ...newArt.toJSON(), user: req.user });
    } catch (error) {
        next(error)
    }
});

//# PUT - updating title and description only 
router.put('/:artId', validateArtPiece, restoreUser, requireAuth, async (req, res, next) => {

    const { title, description } = req.body;
    const userId = req.user.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        const normalizedErrors = {};
    
        for (const error of errorArray) {
            if (!normalizedErrors[error.param]) {
                normalizedErrors[error.param] = [];
            }
            normalizedErrors[error.param].push(error.msg);
        }
        return res.status(400).json({errors: normalizedErrors})
    }

    let artById = await ArtPiece.findByPk(req.params.artId);

    if (!artById) {
        return res.status(404).json({ message: "Art couldn't be found" })
    }

    if (artById.userId !== userId) {
        return res.status(403).json({ message: "Art must belong to user" })
    }

    try {
       artById = await artById.update({
            userId: req.user.id,
            title,
            description,
            imageId: artById.imageId,
       });

       res.status(200).json(artById);
    } catch (error) {
        next(error)
    }
});

//# DELETE art  
router.delete('/:artId', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const { artId } = req.params;

    let artById = await ArtPiece.findByPk(artId);

    if (!artById) {
        return res.status(404).json({ message: "Art couldn't be found" })
    }

    if (artById.userId !== userId) {
        return res.status(403).json({ message: "Art must belong to user" })
    }

    try {
        const artTags = await ArtTag.findAll({ where: { artId } });
        // grab the tag id(s) from this var, then check the join against this tagId to determine if there is any orphaned tag or other art uses this tag...
        const tagIds = artTags.map((artTag) => artTag.tagId);

        for (const tagId of tagIds) {
            const anyOtherTagUse = await ArtTag.findAll({ 
                where: { tagId, artId: { [Op.ne]: artId } } 
            });

            // ...if no other art uses: destroy tag from the tags tbl
            if (anyOtherTagUse.length === 0) {
                await Tag.destroy({ where: { id: tagId } });
            }
            
            // either way...(and if other art uses tags, only) destroy pairs from join with this art id
            await ArtTag.destroy({ where: { tagId, artId } });
        }

        await artById.destroy();

       res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        next(error)
    }
});

//# ==================== TAGS ======================

//* Middleware for only allowing art-owner tag modifications
const checkArtOwner = async (req, res, next) => {
    const { artId } = req.params;

    try {
        const artPiece = await ArtPiece.findByPk(artId);

        if (!artPiece) {
            return res.status(404).json({ message: "Art piece not found." });
        }

        if (artPiece.userId !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to modify tags for this art piece." });
        }

        next();
    } catch (error) {
        next(error);
    }
};

//* Express Validator for Tag
const validateTag = [
    check('tagName')
        .trim()
        .notEmpty().withMessage('Tag name is required.')
        .isLength({ max: 24 }).withMessage('Tag name cannot exceed 24 characters.')
        .matches(/^[0-9a-zA-Z -]+$/).withMessage('Tag name must be alphanumeric, spaces, or hyphens.')
];

//# POST tag
router.post('/:artId/tags', validateTag, restoreUser, requireAuth, checkArtOwner, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        const normalizedErrors = {};
    
        for (const error of errorArray) {
            if (!normalizedErrors[error.param]) {
                normalizedErrors[error.param] = [];
            }
            normalizedErrors[error.param].push(error.msg);
        }
        return res.status(400).json({errors: normalizedErrors})
    }

    const { tagName } = req.body;
    const { artId } = req.params;

    try {
        const formattedTagName = tagName.toLowerCase().replace(/\s+/g, '-');
        const artTagsCount = await ArtTag.count({ where: { artId } });

        if (artTagsCount >= 3) {
            return res.status(400).json({ message: "An art piece cannot have more than 3 tags." });
        }

        let tag = await Tag.findOrCreate({
            where: { name: formattedTagName },
            defaults: { name: formattedTagName }
        });

        const [newTag, created] = tag;

        await ArtTag.create({ artId, tagId: newTag.id });
        res.status(201).json(newTag);

    } catch (error) {
        next(error);
    }
});

//# PUT tag(s)
router.put('/:artId/tags/:tagId', validateTag, restoreUser, requireAuth, checkArtOwner, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        const normalizedErrors = {};
    
        for (const error of errorArray) {
            if (!normalizedErrors[error.param]) {
                normalizedErrors[error.param] = [];
            }
            normalizedErrors[error.param].push(error.msg);
        }
        return res.status(400).json({errors: normalizedErrors})
    }

    const { tagName } = req.body;
    const { artId, tagId } = req.params;

    try {
        const formattedTagName = tagName.toLowerCase().replace(/\s+/g, '-');

        let tag = await Tag.findByPk({
            where: {
                id: tagId
            }
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag not found." });
        }

        const artTagCount = await ArtTag.count({ where: { tagId } });

        if (artTagCount > 1) {
            // when other art uses this tag, create a new tag with new name

            const newTag = await Tag.Create({
                name: formattedTagName 
            });

            // destroy old pair on join
            await ArtTag.destroy({ where: { artId, tagId } }); 
            
            // then create new pair on join with new tag's id
            await ArtTag.create({ artId, tagId: newTag.id }); 

            return res.status(201).json(newTag);
        }

        tag.name = formattedTagName;
        await tag.save();

        res.status(200).json(tag);
    } catch (error) {
        next(error);
    }
});

//# DELETE tag(s)
router.delete('/:artId/tags/:tagId', restoreUser, requireAuth, checkArtOwner, async (req, res, next) => {
    const { artId, tagId } = req.params;

    try {
        const artTag = await ArtTag.findOne({ where: { artId, tagId } });

        if (!artTag) {
            return res.status(404).json({ message: "Tag association not found." });
        }

        await artTag.destroy();

        // Check if the tag is paired to other art
        const remainingAssociations = await ArtTag.count({ where: { tagId } });

        if (remainingAssociations === 0) {
            const tag = await Tag.findByPk({
                where: {
                    id: tagId
                }
            });
            await tag.destroy();
        }

        res.status(200).json({ message: "Tag deleted successfully." });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

