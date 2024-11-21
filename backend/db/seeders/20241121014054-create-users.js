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
    firstName: "Demo",
    lastName: "User",
    email: 'demo@user.io',
    username: 'demo-user',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Larry",
    lastName: "Dell",
    email: 'user1@user.io',
    username: 'larry-dell',
    hashedPassword: bcrypt.hashSync('hilarrious')
  },
  {
    firstName: "Zavier",
    lastName: "Suave",
    email: 'user2@user.io',
    username: 'zavier-suave',
    hashedPassword: bcrypt.hashSync('frankly')
  },
  {
    firstName: "Bruce",
    lastName: "Wayne",
    email: 'user3@user.io',
    username: 'bruce-wayne',
    hashedPassword: bcrypt.hashSync('clownsarestupid')
  },
  {
    firstName: "Leonardo",
    lastName: "DaVinci",
    email: 'user4@user.io',
    username: 'turtledavinci',
    hashedPassword: bcrypt.hashSync('wisdom')
  },
  {
    firstName: "Michelangelo",
    lastName: "Denton",
    email: 'user5@user.io',
    username: 'notaturtle',
    hashedPassword: bcrypt.hashSync('jokester')
  },
  {
    firstName: "Donatello",
    lastName: "Rice",
    email: 'user6@user.io',
    username: 'thebrains',
    hashedPassword: bcrypt.hashSync('brainiac')
  },
  {
    firstName: "Raphael",
    lastName: "Kent",
    email: 'user7@user.io',
    username: 'dont-try-me',
    hashedPassword: bcrypt.hashSync('toughguy')
  }
];

//^ -------------------------------------------- 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(seedData, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    for (const user of seedData) {
      await User.destroy({ where: user });
    }  
  }
};
