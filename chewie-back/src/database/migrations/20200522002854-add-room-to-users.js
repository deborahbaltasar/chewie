'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'meeting_room_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'meeting_rooms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'meeting_room_id');
  }
};
