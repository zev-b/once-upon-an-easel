'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtTag extends Model {
   
    static associate(models) {
      ArtTag.belongsTo(models.ArtPiece, { foreignKey: 'artId' });
      ArtTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
    }
  }
  ArtTag.init(
    {}, 
    {
    sequelize,
    modelName: 'ArtTag',
  });
  return ArtTag;
};