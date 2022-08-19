'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Books", "status", Sequelize.STRING)
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Books", "status")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
