'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtPiece extends Model {
   
    static associate(models) {
      ArtPiece.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      
      ArtPiece.belongsToMany(models.Tag, {
        through: 'ArtTags',
        foreignKey: 'artId',
        otherKey: 'tagId',
      });
      
      // Column: id... 
      // -> setup ref for "artId" on artTags, userFavorites, userBids, comments, artCollections
      // ArtPiece.hasMany
      // ArtPiece.hasMany
      // ArtPiece.hasMany
      // ArtPiece.hasMany
      // ArtPiece.hasMany
    }
  }
  ArtPiece.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING(315),
      validate: {
        len: [0, 315],
      },
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'ArtPiece',
  });
  return ArtPiece;
};