'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      yearOfReleased: {
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.TEXT
      },
      ProfileId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Profiles',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Books');
  }
};