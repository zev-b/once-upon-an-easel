'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
 
    static associate(models) {
      // Many-to-Many relationship with ArtPiece via ArtTag
      Tag.belongsToMany(models.ArtPiece, {
        through: models.ArtTag,
        foreignKey: 'tagId',
        otherKey: 'artId',
      });
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 24],
      },
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};