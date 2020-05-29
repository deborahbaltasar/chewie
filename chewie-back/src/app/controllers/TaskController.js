import * as Yup from 'yup';

import Member from "../models/Member";
import Task from "../models/Task";
import Project from "../models/Project";


class TaskController {

    async store(req, res) { 
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        fk_project: Yup.number().required(),
        description: Yup.string(),
        note: Yup.string(),
        deliver_date: Yup.date().min(new Date()),
      });
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const taskExists = await Task.findOne({ 
        where: { title: req.body.title, fk_project: req.body.fk_project },
      });

      if (taskExists) {
        return res
        .status(401)
        .json({ error: 'Task already exists' });
      }

      const projectExists = await Project.findOne({ 
        where: { id: req.body.fk_project},
      });

      if (!projectExists) {
        return res
        .status(401)
        .json({ error: 'Project does not exists' });
      }
      const { title, description, note, deliver_date, fk_project } = req.body;
  
      const task = await Task.create({
        title,
        fk_project,
        description,
        deliver_date,
        note,  
      });
  
      return res.json(task);
    }
  }
  
  export default new TaskController();