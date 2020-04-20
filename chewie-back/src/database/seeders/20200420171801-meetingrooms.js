'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('meeting_rooms', 
      [
        {
          id: 1, name: 'IoT', room: 'M09', description: "IOT LAB ....", created_at: new Date(), updated_at: new Date()
        },
        {
          id: 2, name: 'Inovacao', room: 'M13', description: "Only for external costumers or core meetings", created_at: new Date(), updated_at: new Date()
        },
        {
          id: 3, name: 'BlueLab', room: 'M04', description: "....", created_at: new Date(), updated_at: new Date()
        }
      ], {});

      await queryInterface.bulkInsert('items', 
      [
        {id: 1, name: 'TV', created_at: new Date(), updated_at: new Date()},
        {id: 2, name: 'Cadeira', created_at: new Date(), updated_at: new Date()},
        {id: 3, name: 'Mesa', created_at: new Date(), updated_at: new Date()},
        {id: 4, name: 'Notebook', created_at: new Date(), updated_at: new Date()},
      ], {});

      return queryInterface.bulkInsert('room_items', 
      [
        {fk_meeting_room: '1', fk_item: 1, quantity: 1, created_at: new Date(), updated_at: new Date()},
        {fk_meeting_room: '1', fk_item: 2, quantity: 10, created_at: new Date(), updated_at: new Date()},
        {fk_meeting_room: '1', fk_item: 3, quantity: 1, created_at: new Date(), updated_at: new Date()},
        
        {fk_meeting_room: '2', fk_item: 1, quantity: 1, created_at: new Date(), updated_at: new Date()},
        {fk_meeting_room: '2', fk_item: 2, quantity: 10, created_at: new Date(), updated_at: new Date()},
        {fk_meeting_room: '2', fk_item: 3, quantity: 1, created_at: new Date(), updated_at: new Date()},

        {fk_meeting_room: '3', fk_item: 1, quantity: 1, created_at: new Date(), updated_at: new Date()},
        {fk_meeting_room: '3', fk_item: 2, quantity: 10, created_at: new Date(), updated_at: new Date()},
        {fk_meeting_room: '3', fk_item: 3, quantity: 1, created_at: new Date(), updated_at: new Date()},
      ], {});


  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('room_items', {id: {[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9]}}, {});
    await queryInterface.bulkDelete('items', {id: {[Op.in]: [1, 2, 3, 4]}}, {});
    return queryInterface.bulkDelete('meeting_rooms', {id: {[Op.in]: [1, 2, 3]}}, {});
  }
};
