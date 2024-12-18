'use strict';

const { ArtTag } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//^ --------------- Seeder Data ---------------
const seedData = [
  { artId: 1, tagId: 9 }, { artId: 1, tagId: 8 },
  { artId: 2, tagId: 2 }, { artId: 2, tagId: 8 },
  { artId: 3, tagId: 5 },
  { artId: 4, tagId: 2 }, { artId: 4, tagId: 8 },
  { artId: 5, tagId: 8 }, { artId: 5, tagId: 9 },
  { artId: 6, tagId: 2 }, //{ artId: 6, tagId: },
  { artId: 7, tagId: 2 },  //{ artId: 7, tagId: },
  { artId: 8, tagId: 4 }, { artId: 8, tagId: 8 },
  { artId: 9, tagId: 7 }, //{ artId: 9, tagId: },
  { artId: 10, tagId: 3 }, { artId: 10, tagId: 8 },
  { artId: 11, tagId: 5 }, //{ artId: 11, tagId: },
  { artId: 12, tagId: 5 }, //{ artId: 12, tagId: },
  { artId: 13, tagId: 3 }, //{ artId: 13, tagId: },
  { artId: 14, tagId: 4 }, { artId: 14, tagId: 9 },
  { artId: 15, tagId: 7 }, { artId: 15, tagId: 8 },
  { artId: 16, tagId: 8 }, //{ artId: 16, tagId: },
  { artId: 17, tagId: 8 }, //{ artId: 17, tagId: },
  { artId: 18, tagId: 8 }, //{ artId: 18, tagId: },
  { artId: 19, tagId: 3 }, //{ artId: 19, tagId: },
  { artId: 20, tagId: 1 }, //{ artId: 20, tagId: },
  { artId: 21, tagId: 7 }, { artId: 21, tagId: 8 },
  { artId: 22, tagId: 4 }, //{ artId: 22, tagId: 8 },
  { artId: 23, tagId: 4 }, { artId: 23, tagId: 9 },
  { artId: 24, tagId: 6}, //{ artId: 24, tagId: },
  { artId: 25, tagId: 4 }, { artId: 25, tagId: 7 },
  { artId: 26, tagId: 8 }, { artId: 26, tagId: 9 },
  { artId: 27, tagId: 8 }, { artId: 27, tagId: 9 },
  { artId: 28, tagId: 6 }, //{ artId: 28, tagId: },
  { artId: 29, tagId: 7 }, { artId: 29, tagId: 8 },
  { artId: 30, tagId: 8 }, { artId: 30, tagId: 9 },
  { artId: 31, tagId: 1 }, //{ artId: 30, tagId: 9 },
  { artId: 32, tagId: 1 }, { artId: 32, tagId: 10 },
  { artId: 33, tagId: 5 }, //{ artId: 30, tagId: 9 },
  { artId: 34, tagId: 6 }, //{ artId: 30, tagId: 9 },
  { artId: 35, tagId: 3 }, //{ artId: 30, tagId: 9 },
  { artId: 36, tagId: 6 }, //{ artId: 30, tagId: 9 },
  { artId: 37, tagId: 8 }, { artId: 37, tagId: 7 },
  { artId: 38, tagId: 3 }, //{ artId: 30, tagId: 9 },
  { artId: 39, tagId: 8 }, //{ artId: 30, tagId: 9 },
  { artId: 40, tagId: 9 }, //{ artId: 30, tagId: 9 },
  { artId: 41, tagId: 1 }, //{ artId: 30, tagId: 9 },
  { artId: 42, tagId: 1 }, //{ artId: 30, tagId: 9 },
  { artId: 43, tagId: 8 }, { artId: 43, tagId: 9 },
  { artId: 44, tagId: 8 }, { artId: 44, tagId: 11 },
  { artId: 45, tagId: 8 }, { artId: 45, tagId: 9 },
  { artId: 46, tagId: 5 }, { artId: 46, tagId: 10 },
  { artId: 47, tagId: 8 }, { artId: 47, tagId: 2 },
  { artId: 48, tagId: 8 }, { artId: 48, tagId: 5 },
  { artId: 49, tagId: 5 }, { artId: 49, tagId: 11 },
  { artId: 50, tagId: 9 }, //{ artId: 30, tagId: 9 },
  { artId: 51, tagId: 6 }, //{ artId: 30, tagId: 9 },
  { artId: 52, tagId: 4 }, { artId: 52, tagId: 9 },
  { artId: 53, tagId: 1 }, //{ artId: 30, tagId: 9 },
  { artId: 54, tagId: 9 }, //{ artId: 30, tagId: 9 },
  { artId: 55, tagId: 9 }, //{ artId: 30, tagId: 9 },
  { artId: 56, tagId: 3 }, //{ artId: 30, tagId: 9 },
  { artId: 57, tagId: 1 }, { artId: 57, tagId: 8 },
  { artId: 58, tagId: 1 }, { artId: 58, tagId: 8 },
  { artId: 59, tagId: 8 }, { artId: 59, tagId: 4 },
  { artId: 60, tagId: 6 }, //{ artId: 30, tagId: 9 },
  { artId: 61, tagId: 8 }, { artId: 61, tagId: 2 },
  { artId: 62, tagId: 8 }, { artId: 62, tagId: 5 },
  { artId: 63, tagId: 9 }, //{ artId: 30, tagId: 9 },
  { artId: 64, tagId: 8 }, { artId: 64, tagId: 11 },
  { artId: 65, tagId: 8 }, //{ artId: 30, tagId: 9 },
  { artId: 66, tagId: 8 }, { artId: 66, tagId: 2 },
  { artId: 67, tagId: 7 }, //{ artId: 30, tagId: 9 },
  { artId: 68, tagId: 9 }, //{ artId: 30, tagId: 9 },

]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ArtTag.bulkCreate(seedData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ArtTags';
    for (const arttag of seedData) {
      await ArtTag.destroy({ where: arttag });
    }
  }
};
