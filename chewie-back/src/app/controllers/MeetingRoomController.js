
import MeetingRoom from '../models/MeetingRoom';
import User from '../models/User';

import RoomItem from '../models/RoomItem';
import Item from '../models/Item';

class MeetingRoomController {
    async index(req, res) {
        const { page = 1 } = req.query;
    
        const rooms = await MeetingRoom.findAll({
          limit: 20,
          offset: (page - 1) * 20,
          attributes: [ 'id', 'name', 'room', 'description', 'admin'],
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

    async delete(req, res) {
      const checkUserAdmin = await User.findOne({
        where: {admin: true},
      });

      if(!checkUserAdmin) {
        return res.status(401).json({error: "Only admins can delete a meeting room"})
      }

      return res.json();

    }
  }

export default new MeetingRoomController();
