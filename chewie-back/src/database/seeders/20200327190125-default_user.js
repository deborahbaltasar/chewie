'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('users', 
    [
      {
        name: 'admin',
        email: 'admin@unifor.br',
        password_hash: '$2a$08$1zhYwwN5mddrUIDdLlHU6O2tF2.UBQzLYdb6Pse./d7fosx/uxiZG',
        admin: true,
        fisrt_logged_in: true,
        avatar_id: null,
        meeting_room_id: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
