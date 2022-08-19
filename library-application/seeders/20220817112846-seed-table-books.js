'use strict';
const fs = require('fs')
module.exports = {
  up (queryInterface, Sequelize) {
    let books = JSON.parse(fs.readFileSync('./books.json', 'utf-8'))
    books = books.map((el)=> {
      el.createdAt = el.updatedAt = new Date()
      el.ProfileId = 1
      return el
    })
    return queryInterface.bulkInsert('Books', books)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
