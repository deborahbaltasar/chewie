import Member from "../models/Member";
import Project from "../models/Project";
import User from "../models/User";

class MemberController {
  async show(req, res) {
    const { id } = req.params;

    const projectExists = await Project.findOne({ 
      where: { id },
    });

    if (!projectExists) {
      return res.status(401).json({
        error: 'Project does not exists'
      });
    }

    const members = await Member.findAll({
      where: { fk_project: id },
      attributes: [ 'id' ],
      include: [
        {
          model: Project,
          attributes: [ 'id', 'name'],
        },
        {
          model: User,
          attributes: [ 'id', 'name', 'email', 'avatar_id'],
        }
      ]
    });

    return res.json(members);
    
    return res.json({point: serializedPoint, items});
  }

  async store(req, res) { 
    const userExists = await User.findOne({ 
      where: {
        id: req.body.fk_user
      },
    });

    if (!userExists) {
      return res.status(401).json({
        error: 'User does not exists'
      });
    }

    const projectExists = await Project.findOne({ 
      where: {
        id: req.body.fk_project
      },
    });

    if (!projectExists) {
      return res.status(401).json({
        error: 'Project does not exists'
      });
    }

    const { fk_project, fk_user } = req.body

    const memberExists = await Member.findOne({ 
      where: {
        fk_user: req.body.fk_user,
        fk_project: req.body.fk_project
      },
    });

    if (memberExists) {
      return res.status(401).json({
        error: 'Member already exists'
      });
    }
    
    const member = await Member.create({
      fk_project,
      fk_user,
    });
    
    return res.status(201).json(member);
  }
}
  
export default new MemberController();