import * as Yup from 'yup';

import MeetingRoom from '../models/MeetingRoom';
import Project from '../models/Project';
import User from '../models/User';
import Statu from '../models/Statu';
import ProjectStatu from '../models/ProjectStatu';
import Task from '../models/Task';
import Checklist from '../models/Checklist';
import Member from '../models/Member';



class ProjectController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const projects = await Project.findAll({
      where: { canceled_at: null },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [ 
        'id',
        'name', 
        'description', 
        'client_name', 
        'type',
        'start',
        'end',
        'value',
        'comments',
        'status_id',    
      ],
      include: [
        {
          model: User,
          attributes: [ 'name'],
        },

       {
        model: MeetingRoom,
        attributes: [ 'id', 'name', 'room'],
       },
       {
        model: ProjectStatu,
        include: [{
          model: Statu,
          attributes: ['id', 'name']
        }]
 
       },
       {
         model: Task,
         attributes: ['title', 'description', 'deliver_date', 'note'],
         include: [{
           model: Checklist,
           attributes: ['name', 'done']
         }]
       },
       {
        model: Member,
        attributes: ['fk_user'],   
        include: [{
          model: User,
          attributes: ['name', 'email', 'meeting_room_id']
        }]
      },
      ]
    });
    return res.json(projects);
  }
  
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


  
        //Check if prpoject exists 
        const projectExists = await Project.findOne({ 
          where: { name: req.body.name },
        });

        if (projectExists  && canceled_at == null) {
          return res
          .status(401)
          .json({ error: 'Project already exists' });
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
      comments, 
  });


    return res.json(project);
  }

  async delete(req, res) {
    const checkUserAdmin = await User.findOne({
      where: {id: req.userId, admin: true},
    });
    // console.log('admin', checkUserAdmin)
    if(!checkUserAdmin) {
      return res.status(401).json({error: "Only admins can delete a project"})
    }
    
    const { id } = req.params;

    const projectExists = await Project.findByPk(id);

    if (!projectExists) {
      return res.status(400).json({ error: 'Project does not exist.' });
    }

    const project = await Project.findByPk(req.params.id);
    
    project.canceled_at = new Date();

    await project.save();
    
    return res.json(project);

  }

  async update(req, res) {
    const checkUserAdmin = await User.findOne({
      where: {id: req.userId, admin: true},
    });
    // console.log('admin', checkUserAdmin)
    if(!checkUserAdmin) {
      return res.status(401).json({error: "Only admins can update a project"})
    }
    
    const { id } = req.params;

    const projectExists = await Project.findByPk(id);

    if (!projectExists) {
      return res.status(400).json({ error: 'Project does not exist.' });
    }

    const project = await Project.findByPk(req.params.id);

    

    project.name = req.body.name;
    project.description = req.body.description;
    project.client_name = req.body.client_name;
    project.type = req.body.type;
    project.start = req.body.start;
    project.end = req.body.end;
    project.value = req.body.value;
    project.meeting_room_id = req.body.meeting_room_id;
    project.responsible = req.body.responsible;
    project.comments = req.body.comments;
    project.status_id = req.body.status_id;
    project.updatedAt = new Date();

    await project.save();
    
    return res.json(project);
  }
}
export default new ProjectController();