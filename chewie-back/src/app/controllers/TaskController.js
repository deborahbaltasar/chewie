import * as Yup from 'yup';

import Member from "../models/Member";
import TaskMember from "../models/TaskMember";
import Task from "../models/Task";
import Project from "../models/Project";
import User from '../models/User';


class TaskController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const tasks = await Task.findAll({
      where: { deleted_at: null },
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [ 
        'id',
        'title', 
        'description', 
        'deliver_date', 
        'note',  
      ],
      include: [
        {
          model: Project,
          attributes: ['name'],
        },
        {
          model: TaskMember,
          attributes: ['id'],
          include: [{
            model: Member,
            attributes: ['id'],
            include: [{
              model: User,
              attributes: ['name'],
            }]
          }]
        },
      ]
    });

    return res.json(tasks);
  }

  async show(req, res) {
    const { id } = req.params;

    const projectExists = await Project.findOne({ 
      where: { id },
    });

    if (!projectExists) {
      return res.status(401).json({
        error: 'Project does not exists'
      });
    }

    const tasks = await Task.findAll({
      where: { deleted_at: null, fk_project: id },
      attributes: [ 
        'id',
        'title', 
        'description',
        'fk_project', 
        'deliver_date', 
        'note',  
      ],
    });

    return res.json(tasks);
  }
    
  
  async store(req, res) {
    const { 
      title,
      description,
      note,
      deliver_date,
      fk_project
    } = req.body;

      // const schema = Yup.object().shape({
      //   title: Yup.string().required(),
      //   fk_project: Yup.number().required(),
      //   description: Yup.string(),
      //   note: Yup.string(),
      //   deliver_date: Yup.date().min(new Date()),
      // });
      // if (!(await schema.isValid(req.body))) {
      //   return res.status(400).json({ error: 'Validation fails' });
      // }

    const taskExists = await Task.findOne({ 
      where: {
        title: title,
        fk_project: fk_project
      },
    });

    if (taskExists) {
      return res.status(401).json({
        error: 'Task already exists'
      });
    }

    const projectExists = await Project.findOne({ 
      where: {
        id: fk_project
      },
    });

    if (!projectExists) {
      return res.status(401).json({
        error: 'Project does not exists'
      });
    }
  
    const task = await Task.create({
      title,
      fk_project,
      description,
      deliver_date,
      note,  
    });
  
    return res.status(201).json(task);
  }

  async update(req, res) {

    const { id } = req.params;

    const taskExists = await Task.findByPk(id);

    if (!taskExists) {
      return res.status(400).json({
        error: 'Task does not exist.'
      });
    }

    const task = await Task.findByPk(id);

    const {
      title,
      description,
      deliver_date,
      note
    } = req.body;

    task.title = title;
    task.description = description;
    task.deliver_date = deliver_date;
    task.note = note;
    task.updatedAt = new Date();

    await task.save();
    
    return res.json(task);
  }
}
  
export default new TaskController();