
import Item from '../models/Item';
import MeetingRoom from '../models/MeetingRoom';
import RoomItem from '../models/RoomItem';
import User from '../models/User';

class MeetingRoomController {
  async index(req, res) {
    const { page = 1 } = req.query;
  
    const rooms = await MeetingRoom.findAll({
      where: { deleted_at: null },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'name',
        'room',
        'description',
        'admin'
      ],
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
    const checkUserAdmin = await User.findOne({
      where: {
        id: req.userId,
        admin: true
      },
    });
  
    if (!checkUserAdmin) {
      return res.status(401).json({
        error: "Only admins can create a meeting room"
      });
    }

    const roomExists = await MeetingRoom.findOne({
      where: {
        name: req.body.name
      } 
    });

    if (roomExists) {
      return res.status(400).json({
        error: 'Meeting room already exists.'
      });
    }

    const { id, name, room } = await MeetingRoom.create(req.body);

    return res.status(201).json({
      id,
      name,
      room,
    });
  }

  async delete(req, res) {
    const checkUserAdmin = await User.findOne({
      where: {
        id: req.userId,
        admin: true
      },
    });
    // console.log('admin', checkUserAdmin)
    if (!checkUserAdmin) {
      return res.status(401).json({
        error: "Only admins can delete a meeting room"
      })
    }
    
    const { id } = req.params;

    const roomExists = await MeetingRoom.findByPk(id);
  
    if (!roomExists) {
      return res.status(400).json({
        error: 'Room does not exist.'
      });
    }
  
    const room = await MeetingRoom.findByPk(req.params.id);
    
    room.deleted_at = new Date();

    await room.save();
    
    return res.json(room);
  }

  async update(req, res) {
    const checkUserAdmin = await User.findOne({
      where: {
        id: req.userId,
        admin: true
      },
    });
    // console.log('admin', checkUserAdmin)
    if (!checkUserAdmin) {
      return res.status(401).json({
        error: "Only admins can update a meeting room"
      })
    }
    
    const { id } = req.params;

    const roomExists = await MeetingRoom.findByPk(id);
  
    if (!roomExists) {
      return res.status(400).json({
        error: 'Room does not exist.'
      });
    }
  
    const room = await MeetingRoom.findByPk(req.params.id);

    room.name = req.body.name;
    room.description = req.body.description;
    room.admin = req.body.admin;
    room.room = req.body.room;

    await room.save();
    
    return res.json(room);
  }
}

export default new MeetingRoomController();