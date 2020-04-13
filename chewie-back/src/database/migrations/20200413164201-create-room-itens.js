'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('room_items', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        meeting_room_id: {
          type: Sequelize.INTEGER,
          references: { model: 'meeting_rooms', key: 'id' },
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
      return queryInterface.dropTable('room_items');
  },
};