'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Book)
    }
  }
  Profile.init({ //validasi dsni
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `First Name Must be Filled!`
        },
        notEmpty: {
          msg: `First Name Must be Filled!`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Last Name Must be Filled!`
        },
        notEmpty: {
          msg: `Last Name Must be Filled!`
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Address Must be Filled!`
        },
        notEmpty: {
          msg: `Address Must be Filled!`
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Phone Number Must be Filled!`
        },
        notEmpty: {
          msg: `Phone Number Must be Filled!`
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `City Must be Filled!`
        },
        notEmpty: {
          msg: `City Must be Filled!`
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Province Must be Filled!`
        },
        notEmpty: {
          msg: `Province Must be Filled!`
        }
      }
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Zip Code Must be Filled!`
        },
        notEmpty: {
          msg: `Zip Code Must be Filled!`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};