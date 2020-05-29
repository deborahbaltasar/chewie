import Member from "../models/Member";
import User from "../models/User";
import Project from "../models/Project";

class MemberController {

    async store(req, res) { 
      const userExists = await User.findOne({ 
        where: { id: req.body.fk_user},
      });

      if (!userExists) {
        return res
        .status(401)
        .json({ error: 'User does not exists' });
      }

      const projectExists = await Project.findOne({ 
        where: { id: req.body.fk_project},
      });

      if (!projectExists) {
        return res
        .status(401)
        .json({ error: 'Project does not exists' });
      }

      const {fk_project, fk_user} = req.body

      const memberExists = await Member.findOne({ 
        where: { fk_user: req.body.fk_user, fk_project: req.body.fk_project },
      });

      if (memberExists) {
        return res
        .status(401)
        .json({ error: 'Member already exists' });
      }
      
      const member = await Member.create({
        fk_project,
        fk_user,
      });
      
      return res.json(member);
    }
  }
  
  export default new MemberController();