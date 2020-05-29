'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('project_status', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        fk_status: {
          type: Sequelize.INTEGER,
          references: { model: 'status', key: 'id' },
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
      return queryInterface.dropTable('project_status');
  },
};