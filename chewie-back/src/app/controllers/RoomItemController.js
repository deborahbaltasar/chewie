import * as Yup from 'yup';

import RoomItem from '../models/RoomItem';
import MeetingRoom from '../models/MeetingRoom';




class RoomItemController {
  async index(req, res) {
    const items = await RoomItem.findByPk(req.params.id, {
      attributes: ['name', 'quantity'],
      include: [
        {
          model: MeetingRoom,
          attributes: ['name', 'room'],
        },
      ],
    });
    return res.json(items);
  }
  
  async store(req, res) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        quantity: Yup.string().required(),
        meeting_room_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { name, quantity, meeting_room_id} = req.body;
    
    const roomExists = await MeetingRoom.findOne({ 
      where: { id: meeting_room_id},
    });

    
    if (!roomExists) {
      return res
      .status(401)
      .json({ error: 'Meeting room does not exists' });
    }

    const item = await RoomItem.create({
        name,
        quantity,
        meeting_room_id,
    });
   

    return res.json(item);
  }
}

export default new RoomItemController();