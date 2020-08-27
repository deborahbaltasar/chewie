import Checklist from "../models/Checklist";
import Task from "../models/Task";

class ChecklistController {

  async show(req, res) {
    const { id } = req.params;

    const taskExists = await Task.findOne({ 
      where: { id },
    });

    if (!taskExists) {
      return res.status(401).json({
        error: 'Task does not exists'
      });
    }

    const checklist = await Checklist.findAll({
      where: {  fk_task: id },
      attributes: [ 
        'id',
        'name', 
        'done',   
      ],
    });

    return res.json(checklist);
  }  
  
  async store(req, res) { 

      const checklistExists = await Checklist.findOne({ 
        where: { name: req.body.name, fk_task: req.body.fk_task },
      });

      if (checklistExists) {
        return res.status(401).json({
          error: 'Checklist already exists' 
        });
      }

      const taskExists = await Task.findOne({ 
        where: { id: req.body.fk_task },
      });

      if (!taskExists) {
        return res.status(401).json({
          error: 'Task does not exist'
        });
      }
  
      const { id, name, fk_task, done } = await Checklist.create(req.body);

      return res.json({
        id,
        name,
        fk_task,
        done,
      });
    }
  }
  
  export default new ChecklistController();