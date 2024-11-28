const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const { User, ArtPiece, Tag, ArtTag } = require('../../db/models'); 
const router = express.Router();


//# GET tags for NavBar filtering option
router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        next(error);
    }
});

module.exports = router;