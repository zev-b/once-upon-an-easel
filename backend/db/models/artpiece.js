'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtPiece extends Model {
   
    static associate(models) {
      // Column: id... 
      // -> setup ref for "artId" on artTags, userFavorites, userBids, comments, artCollections
      ArtPiece.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

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
    imgId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        max: 315
      },
    },
    available: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ArtPiece',
  });
  return ArtPiece;
};