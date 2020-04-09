import * as Yup from 'yup';

import MeetingRoom from '../models/MeetingRoom';
import Project from '../models/Project';


class ProjectController {

  async store(req, res) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        client_name: Yup.string().required(),
        type: Yup.string().required(),
        start: Yup.date().required(),
        end: Yup.date().required(),
        value: Yup.string().required(),
        meeting_room_id: Yup.number().required(),
        responsible: Yup.string().required(),
        status: Yup.string().required(),
        comments: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { 
        name, 
        description,
        client_name,
        type,
        start, 
        end,
        value,
        meeting_room_id,
        responsible,
        status,
        comments, 
        } 
    = req.body;
  
    //Check if meetingRoom exists 
    const roomExists = await MeetingRoom.findOne({ 
      where: { id: meeting_room_id},
    });

    
    if (!roomExists) {
      return res
      .status(401)
      .json({ error: 'Meeting room does not exists' });
    }

    const project = await Project.create({
      name,
      description,
      client_name,
      type,
      start,
      end,
      value,
      meeting_room_id,
      responsible,
      status,
      comments, 

  });


    return res.json(project);
  }
}
export default new ProjectController();