'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('product_infos', 'title', 'consist');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('product_infos', 'consist', 'title');
  }
};
