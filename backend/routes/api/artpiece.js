const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, ArtPiece, Tag } = require('../../db/models'); 
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const router = express.Router();
