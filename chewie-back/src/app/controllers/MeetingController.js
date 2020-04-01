import * as Yup from 'yup';

import MeetingRoom from '../models/MeetingRoom';
import Meeting from '../models/Meeting';


class MeetingController {

  async store(req, res) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        meetingRoom_id: Yup.number().required(),
        date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { name, meetingRoom_id, date} = req.body;

    const roomExists = await MeetingRoom.findOne({ 
      where: { id: meetingRoom_id},
    });

    if (!roomExists) {
      return res
      .status(401)
      .json({ error: 'Meeting room does not exists' });
    }

    const meeting = await Meeting.create({
        name,
        user_id: req.userId,
        meetingRoom_id,
        date,
    });

    return res.json(meeting);
  }
}
export default new MeetingController();