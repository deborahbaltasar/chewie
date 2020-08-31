import PartnerProject from '../models/PartnerProject';
import Partner from '../models/Partner';
import Project from '../models/Project';

class PartnerProjectController {
  async index(req, res) {
    const partnerproj = await PartnerProject.findByPk(req.params.id, {
      include: [
        {
          model: Partner,
          attributes: [ 'name', 'email', 'number' ],
        },
        {
          model: Project,
          attributes: [ 'name' ],
        },
      ],
    });

    return res.json(partnerproj);
  }
  
  async store(req, res) { 

    const partnerExists = await Partner.findOne({ 
      where: {
        id: req.body.partner_id
      },
    });

    if (!partnerExists) {
      return res.status(401).json({
        error: 'Partner does not exists'
      });
    }

    const projectExists = await Project.findOne({ 
      where: {
        id: req.body.project_id
      },
    });

    if (!projectExists) {
      return res.status(401).json({
        error: 'Project does not exists'
      });
    }
    
    const { partner_id, project_id } = req.body

    const partproj = await PartnerProject.create({
      project_id,
      partner_id,
    });
   
    return res.json(partproj);
  }
}
  
export default new PartnerProjectController();