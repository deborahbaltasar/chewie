import Status from "../models/Statu";

class StatuController {

  async index(req, res) {
    
    const status = await Status.findAll({
      attributes: ['id', 'name'],   
    });

    return res.json(status);
  }

  async store(req, res) { 

    const statusExists = await Status.findOne({ 
      where: { 
        name: req.body.name 
      },
    });

    if (statusExists) {
      return res.status(401).json({
        error: 'Status already exists'
      });
    }

    const { id, name } = await Status.create(req.body);

    return res.status(201).json({
      id,
      name,
    });
  }
}
  
export default new StatuController();