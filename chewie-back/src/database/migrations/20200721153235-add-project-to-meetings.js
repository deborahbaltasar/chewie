'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'meetings',
      'fk_project',
      {
        type: Sequelize.INTEGER,
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('meetings', 'fk_project');
  }
};
