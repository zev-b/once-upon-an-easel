'use strict';

const { Tag } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//^ --------------- Seeder Data ---------------
const seedData = [
  { name: 'Jerusalem-Urban' },
  { name: 'Portrait' },
  { name: 'Landscape' },
  { name: 'Concept' },
  { name: 'Still-Life' },
  { name: 'Sketch' },
  { name: 'Tradition' },
  { name: 'Watercolor' },
  { name: 'Inspiration' },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Tag.bulkCreate(seedData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tags';
    for (const tag of seedData) {
      await Tag.destroy({ where: tag });
    } 
  }
};
