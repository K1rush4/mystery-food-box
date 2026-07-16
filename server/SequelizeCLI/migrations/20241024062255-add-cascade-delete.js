'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Изменение связи между Category и Product
    await queryInterface.removeConstraint('products', 'products_categoryId_fkey');
    await queryInterface.addConstraint('products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'products_categoryId_fkey',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.removeConstraint('product_infos', 'product_infos_productId_fkey');
    await queryInterface.addConstraint('product_infos', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'product_infos_productId_fkey',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });


    await queryInterface.removeConstraint('baskets', 'baskets_userId_fkey');
    await queryInterface.addConstraint('baskets', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'baskets_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('products', 'products_categoryId_fkey');
    await queryInterface.addConstraint('products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'products_categoryId_fkey',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'SET NULL', 
    });


    await queryInterface.removeConstraint('product_infos', 'product_infos_productId_fkey');
    await queryInterface.addConstraint('product_infos', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'product_infos_productId_fkey',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'SET NULL', 
    });


    await queryInterface.removeConstraint('baskets', 'baskets_userId_fkey');
    await queryInterface.addConstraint('baskets', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'baskets_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    });
  }
};