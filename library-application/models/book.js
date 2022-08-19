'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Profile)
    }
  }
  Book.init({ //valid
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Title Must be Filled!`
        },
        notEmpty: {
          msg: `Title Must be Filled!`
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Author Must be Filled!`
        },
        notEmpty: {
          msg: `Author Must be Filled!`
        }
      }
    },
    yearOfReleased: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Released Year Must be Filled!`
        },
        notEmpty: {
          msg: `Released Year Must be Filled!`
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Genre Must be Filled!`
        },
        notEmpty: {
          msg: `Genre Must be Filled!`
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Image Url Must be Filled!`
        },
        notEmpty: {
          msg: `Image Url Must be Filled!`
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Synopsis Must be Filled!`
        },
        notEmpty: {
          msg: `Synopsis Must be Filled!`
        }
      }
    },
    ProfileId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  
  return Book;
};