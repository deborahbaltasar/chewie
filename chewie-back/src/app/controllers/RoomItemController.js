import * as Yup from 'yup';

import RoomItem from '../models/RoomItem';
import Item from '../models/Item';
import MeetingRoom from '../models/MeetingRoom';




class RoomItemController {
  async index(req, res) {
    const items = await RoomItem.findByPk(req.params.id, {
      attributes: ['quantity'],
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

  }
}

export default new RoomItemController();