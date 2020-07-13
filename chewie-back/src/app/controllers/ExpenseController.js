import Expense from "../models/Expense";
import User from "../models/User";
import Project from "../models/Project";

class ExpenseController {

    async show(req, res) {
        const {id} = req.params;
    
        const projectExists = await Project.findOne({ 
          where: { id: id},
        });
    
        if (!projectExists) {
          return res
          .status(401)
          .json({ error: 'Project does not exists' });
        }
    
        const expenses = await Expense.findAll({
          where: { fk_project: id },
          attributes: [ 
            'id',
            'price', 
            'reason',
            'date', 
 
          ],
        });
        return res.json(expenses);
    
      }

    async store(req, res) { 
        
        const checkUserAdmin = await User.findOne({
            where: {id: req.userId, admin: true},
          });
          // console.log('admin', checkUserAdmin)
          if(!checkUserAdmin) {
            return res.status(401).json({error: "Only admins can create an expense"})
          }

        const { fk_project } = req.body;

        const projectExists = await Project.findByPk(fk_project);
    
        if (!projectExists) {
          return res.status(400).json({ error: 'Project does not exist.' });
        }
  
      const { id, price, reason, date } = await Expense.create(req.body);

      return res.json({
          id,
          fk_project,
          price,
          reason,
          date,
          
      });
    }
  }
  
  export default new ExpenseController();