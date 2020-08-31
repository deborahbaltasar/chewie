import Statu from "../models/Statu";
import ProjectStatu from "../models/ProjectStatu";
import Project from "../models/Project";

class StatuController {
  async store(req, res) { 
    const { fk_project, fk_status } = req.body;

    const projStatusExists = await ProjectStatu.findOne({ 
      where: {
        fk_project
      },
    });

    if (projStatusExists) {
      return res.status(401).json({
        error: 'This project already has status'
      });
    }
    
    const statusExists = await Statu.findOne({
      where: { id: fk_status },
    });
    
    if (!statusExists) {
      return res.status(401).json({
        error: "Status does not exists"
      })
    }

    const projectExists = await Project.findOne({
      where: { id: fk_project },
    });
    
    if (!projectExists) {
      return res.status(401).json({
        error: "Project does not exists"
      })
    }

    const projectStatus = await ProjectStatu.create({
      fk_project,
      fk_status,
    });
  
    return res.status(201).json(projectStatus);
  }
}
  
export default new StatuController();