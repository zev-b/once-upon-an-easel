'use strict';
const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      // User.hasMany (user_favorite) fk: userId
      // User.hasMany (art_piece) fk: userId
      // User.hasMany (user_bid) fk: userId
      // User.hasMany (comment) fk: userId
      // User.hasMany (collection) fk: userId
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      }
    },
    hashed_password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [72, 72]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashed_password'],
      }
    }
  });
  return User;
};