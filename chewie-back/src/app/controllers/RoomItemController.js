import * as Yup from 'yup';

import RoomItem from '../models/RoomItem';
import Item from '../models/Item';
import MeetingRoom from '../models/MeetingRoom';




class RoomItemController {
  async index(req, res) {
    const items = await RoomItem.findByPk(req.params.id, {
      attributes: ['id','quantity'],
      include: [
        {
          model: MeetingRoom,
          attributes: ['name', 'room'],
        },
        {
          model: Item,
          attributes: ['name'],
        },
      ],
    });
    return res.json(items);
  }
  
  async store(req, res) {

  const { id, fk_meeting_room, fk_item, quantity } = req.body;
  const roomItemExists = await Item.findOne({ where: {id: req.body.fk_item} });

  if(roomItemExists) {
      return res.status(400).json({ error: 'This item already exists in this room' });
  }

  const roomExists = await MeetingRoom.findOne({ 
    where: { id: fk_meeting_room},
  });

  if (!roomExists) {
    return res
    .status(401)
    .json({ error: 'Meeting room does not exist' });
  }

  const itemExists = await Item.findOne({ 
    where: { id: fk_item},
  });

  if (!itemExists) {
    return res
    .status(401)
    .json({ error: 'Item does not exists' });
  }

  const roomItem = await RoomItem.create({
      id,
      fk_meeting_room,
      fk_item,
      quantity,
  });

  return res.json(roomItem);
  }
}

export default new RoomItemController();