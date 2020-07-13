'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('invoices', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        payment_date: {
          type: Sequelize.DATE,
          allowNull: false, 
        },
        issue_date: {
          type: Sequelize.DATE,
          allowNull: false, 
        },
        request_date: {
          type: Sequelize.DATE,
          allowNull: false, 
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false, 
        },

        fk_emmiter: {
          type: Sequelize.INTEGER,
          references: { model: 'emmiters', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        fk_project: {
          type: Sequelize.INTEGER,
          references: { model: 'projects', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false, 
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },

      });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('invoices');
  },
};