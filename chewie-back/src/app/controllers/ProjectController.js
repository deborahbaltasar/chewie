import * as Yup from 'yup';

import MeetingRoom from '../models/MeetingRoom';
import Project from '../models/Project';
import User from '../models/User';


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
        responsible: Yup.number().required(),
        status: Yup.string().required(),
        comments: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const checkUserAdmin = await User.findOne({
      where: {id: req.userId, admin: true},
    });
    
    if(!checkUserAdmin) {
      return res.status(401).json({error: "Only admins can create projects"})
    }

    const responsibleExists = await User.findOne({
      where: {id: req.body.responsible},
    });
    
    if(!responsibleExists) {
      return res.status(401).json({error: "User does not exists"})
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
  
        //Check if prpoject exists 
        const projectExists = await Project.findOne({ 
          where: { name },
        });

        if (projectExists) {
          return res
          .status(401)
          .json({ error: 'Project already exists' });
        }
    
    
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