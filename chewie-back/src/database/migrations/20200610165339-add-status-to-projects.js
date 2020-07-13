'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'projects',
      'status_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'status', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('projects', 'status_id');
  }
};

