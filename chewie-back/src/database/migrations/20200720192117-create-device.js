'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_device_category: {
        type: Sequelize.INTEGER,
        references: {model: 'device_categories', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      fk_meeting_room: {
        type: Sequelize.INTEGER,
        references: {model: 'meeting_rooms', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('devices');
  }
};