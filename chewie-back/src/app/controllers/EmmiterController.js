import Emmiter from "../models/Emmiter";
import User from "../models/User";

class EmmiterController {
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
        error: "Only admins can add an emmiter"
      })
    }

    const newEmmiter = await Emmiter.create(req.body);

    return res.store(201).json(newEmmiter);
  }
}

export default new EmmiterController();