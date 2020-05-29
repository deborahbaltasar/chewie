
import Member from "../models/Member";
import Task from "../models/Task";
import Project from "../models/Project";
import TaskMember from "../models/TaskMember";


class TaskController {

    async store(req, res) { 
      
      const { fk_task, fk_member } = req.body;

      const taskExists = await Task.findOne({ 
        where: { id: fk_task },
      });

      if (!taskExists) {
        return res
        .status(401)
        .json({ error: 'Task does not exist' });
      }


      const memberExists = await Member.findOne({ 
        where: { id: fk_member},
      });

      if (!memberExists) {
        return res
        .status(401)
        .json({ error: 'Member does not exist' });
      }
  
      const taskMember = await TaskMember.create({
        fk_task,
        fk_member,
      });
  
      return res.json(taskMember);

    }
  }
  
  export default new TaskController();