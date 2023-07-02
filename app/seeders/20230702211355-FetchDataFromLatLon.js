'use strict';

const dataLatLon = require('../../files/latlon');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    dataLatLon.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      if (element.id) {
        delete element.id
      }
    })
    return queryInterface.bulkInsert('LatLons', dataLatLon, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkInsert('LatLons', null, {})
  }
};
