'use strict';

const ArtTag = require('../models/arttag');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//^ --------------- Seeder Data ---------------
const seedData = [
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
  {
    artId: ,
    tagId: ,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ArtTag.bulkCreate(seedData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
