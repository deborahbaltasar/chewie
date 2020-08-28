import User from "../models/User";
import Project from "../models/Project";
import Emmiter from "../models/Emmiter";
import Invoice from "../models/Invoice";

class InvoiceController {

  async store(req, res) { 
    
    const checkUserAdmin = await User.findOne({
      where: {
        id: req.userId,
        admin: true
      },
    });
      // console.log('admin', checkUserAdmin)
    if (!checkUserAdmin) {
      return res.status(401).json({
        error: "Only admins can create an invoice"
      })
    }

    const { fk_project, fk_emmiter } = req.body;

    const projectExists = await Project.findByPk(fk_project);
  
    if (!projectExists) {
      return res.status(400).json({
        error: 'Project does not exist.'
      });
    }

    const emmiterExists = await Emmiter.findByPk(fk_emmiter);
  
    if (!emmiterExists) {
      return res.status(400).json({
        error: 'Emmiter does not exist.'
      });
    }
  
    const { 
      id, 
      price,
      payment_date,
      issue_date,
      request_date,
      status
    } = await Invoice.create(req.body);

    return res.status(201).json({
      id,
      fk_project,
      fk_emmiter,
      price,
      payment_date,
      issue_date,
      request_date,
      status,
    });
  }
}
  
export default new InvoiceController();