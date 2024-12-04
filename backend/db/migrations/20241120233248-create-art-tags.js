'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ArtTags';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, {
      artId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ArtPieces', // References ArtPieces tbl
          key: 'id',
        },
        onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
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
        // onUpdate: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options);
  }
};