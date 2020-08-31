import * as Yup from 'yup';

import { Op } from 'sequelize'

import {startOfDay, endOfDay, parseISO} from 'date-fns';

import MeetingRoom from '../models/MeetingRoom';
import User from '../models/User';
import Meeting from '../models/Meeting';
import Project from '../models/Project';


class MeetingController {
  async show(req, res) {

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const meetings = await Meeting.findAll({
      where: {
        canceled_at: null,
        start: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
        }
      },
      order: ['start'],
      attributes: [ 
        'id',
        'name', 
        'start',
        'end',   
      ],
      include: [
        {
          model: User,
          attributes: [ 'name'],
        },
        {
          model: Project,
          attributes: [ 'name'],
        },
        {
          model: MeetingRoom,
          attributes: ['name', 'room', 'id'], 
        },   
      ],
    });
    
    return res.json(meetings);
  }  
  
  async index(req, res) {
    // const { page = 1 } = req.query;
    const allMeetings = await Meeting.findAll({
      where: { canceled_at: null},
      order: ['start'],
      // limit: 20,
      // offset: (page - 1) * 20,
      attributes: [ 'id', 'name', 'start', 'end'],
      include: [
        {
          model: User,
          attributes: [ 'name'],
        },
        {
          model: Project,
          attributes: [ 'name'],
        },
        {
          model: MeetingRoom,
          attributes: ['name', 'room', 'id'], 
        },   
      ],
    });
    
    return res.json(allMeetings);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        meeting_room_id: Yup.number().required(),
        start: Yup.date().required(),
        end: Yup.date().required(),
        project_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const { name, meeting_room_id, start, end, project_id} = req.body;
    
    const roomExists = await MeetingRoom.findOne({ 
      where: { id: meeting_room_id},
    });

    
    if (!roomExists) {
      return res
      .status(401)
      .json({ error: 'Meeting room does not exists' });
    }
    const { id } = req.body;
    
    const meeting = await Meeting.create({
        id,
        name,
        user_id: req.userId,
        meeting_room_id,
        start,
        end,
        fk_project: project_id
    });

    return res.json(meeting);
  }

  async delete(req, res) {

    const meeting = await Meeting.findByPk(req.params.id);

    if (meeting.user_id !== req.userId) {
      return res.status(401).json({
        error: "You dont have permission to cancel this meeting"
      })
    }
    
    meeting.canceled_at = new Date();

    await meeting.save();
    
    return res.json(meeting);

  }  

}
export default new MeetingController();