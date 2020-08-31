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
    const { name, fk_task } = req.body;

    const checklistExists = await Checklist.findOne({ 
      where: { name: name, fk_task: fk_task },
    });

    if (checklistExists) {
      return res.status(401).json({
        error: 'Checklist already exists' 
      });
    }

    const taskExists = await Task.findOne({ 
      where: { id: fk_task },
    });

    if (!taskExists) {
      return res.status(401).json({
        error: 'Task does not exist'
      });
    }
  
    const newChecklist = await Checklist.create(req.body);

    return res.status(201).json(newChecklist);
  }
}
  
export default new ChecklistController();