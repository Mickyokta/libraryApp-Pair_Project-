'use strict';

const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
    }
  }
  User.init({ //valid
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Username Must be Filled!`
        },
        notEmpty: {
          msg: `Username Must be Filled!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password Must be Filled!`
        },
        notEmpty: {
          msg: `Password Must be Filled!`
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email Must be Filled!`
        },
        notEmpty: {
          msg: `Email Must be Filled!`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        return bcrypt.genSaltSync(10)
          .then((salt) => {
            return bcrypt
              .hash(user.password, salt)
              .then((hashedPassword) => {
                user.password = hashedPassword;
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      },
    },
  });
  return User;
};