'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArtTags', {
      artId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ArtPieces', // References ArtPieces tbl
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // References Tags tbl
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'ArtTags';
    await queryInterface.dropTable(options);
  }
};