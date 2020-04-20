
import MeetingRoom from '../models/MeetingRoom';

import RoomItem from '../models/RoomItem';
import Item from '../models/Item';

class MeetingRoomController {
    async index(req, res) {
        const { page = 1 } = req.query;
    
        const rooms = await MeetingRoom.findAll({
          limit: 20,
          offset: (page - 1) * 20,
          attributes: [ 'name', 'room'],
          include: [{
              model: RoomItem,
              attributes: [ 'quantity'],
              include: [{
                model: Item,
                attributes: [ 'name'],
                as: 'info'
              }]
            }]
        });
        return res.json(rooms);
      }
      
    async store(req, res) {
        console.log('Data', req.body.name)
        const roomExists = await MeetingRoom.findOne({ where: {name: req.body.name} });

        if(roomExists) {
            return res.status(400).json({ error: 'Meeting room already exists.' });
        }

        const {id, name, room } = await MeetingRoom.create(req.body);

        return res.json({
            id,
            name,
            room,
            
        });
    }
}

export default new MeetingRoomController();
