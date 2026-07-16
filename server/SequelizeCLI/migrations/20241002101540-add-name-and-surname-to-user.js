'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('users', 'surname', {
      type: Sequelize.STRING,
      allowNull: true,
    });


    await queryInterface.sequelize.query(`
      UPDATE users
      SET name = 'default_name', surname = 'default_surname'
      WHERE name IS NULL OR surname IS NULL
    `);


    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('users', 'surname', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'name');
    await queryInterface.removeColumn('users', 'surname');
  }
};
