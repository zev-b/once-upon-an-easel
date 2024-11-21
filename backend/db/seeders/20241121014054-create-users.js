'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//^ --------------- Seeder Data ---------------
const seedData = [
  {
    firstName: "Marc",
    lastName: "Depot",
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('demolizer')
  },
  {
    firstName: "Marked",
    lastName: "Depotted",
    email: 'user1@user.io',
    username: 'LarryTest',
    hashedPassword: bcrypt.hashSync('hilarrious')
  },
  {
    firstName: "Marque",
    lastName: "Depotte",
    email: 'user2@user.io',
    username: 'FrankTest',
    hashedPassword: bcrypt.hashSync('frankly')
  },
  {
    firstName: "Bruce",
    lastName: "Wayne",
    email: 'vengeance@batcave.io',
    username: 'dark-knight',
    hashedPassword: bcrypt.hashSync('clownsarestupid')
  },
  {
    firstName: "Leonardo",
    lastName: "DaVinci",
    email: 'ninja1@turtles.io',
    username: 'turtledavinci',
    hashedPassword: bcrypt.hashSync('wisdom')
  },
  {
    firstName: "Michelangelo",
    lastName: "NotaTurtle",
    email: 'ninja2@turtles.io',
    username: 'turtleBuonarroti',
    hashedPassword: bcrypt.hashSync('jokester')
  },
  {
    firstName: "Donatello",
    lastName: "Turtle",
    email: 'ninja3@turtles.io',
    username: 'thebrains',
    hashedPassword: bcrypt.hashSync('brainiac')
  },
  {
    firstName: "Raphael",
    lastName: "Bruiser",
    email: 'ninja4@turtles.io',
    username: 'dont-try-me',
    hashedPassword: bcrypt.hashSync('toughguy')
  }
]
//^ -------------------------------------------- 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
