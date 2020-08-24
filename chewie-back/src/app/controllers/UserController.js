import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import File from '../models/File';
import MeetingRoom from '../models/MeetingRoom';

class UserController {

  async show(req, res) {
    const { id, email, name, avatar, room, fisrt_logged_in } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: MeetingRoom,
          as: 'room',
          attributes: ['id', 'name', 'room'],
        },
      ],
    });
      
    return res.json({
      id,
      name,
      email,
      avatar,
      room,
      fisrt_logged_in,
    });
  }

  async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail'});
        }

        const userExists = await User.findOne({ where: {email: req.body.email} });

        if(userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const {id, name, email, admin, fisrt_logged_in } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            admin,
            fisrt_logged_in
        });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      room: Yup.number(),
    });
      
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
      
    const { email, oldPassword} = req.body;
      
    const user = await User.findByPk(req.userId);

    if(user.fisrt_logged_in === true) {
      user.fisrt_logged_in = false;
    }
     
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });
      if (userExists) {
        return res.status(400).json({
          error: 'User already exists',
        });
      }
    }
      
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    if(user.confirmPassword) {
      user.password_hash = await bcrypt.hash(user.confirmPassword, 8);
    }

    user.email = req.body.email;
    user.updatedAt = new Date();

    user.save();

    const { id, name, avatar, room, fisrt_logged_in } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: MeetingRoom,
          as: 'room',
          attributes: ['id', 'name', 'room'],
        },
      ],
    });
      
    return res.json({
      id,
      name,
      email,
      avatar,
      room,
      fisrt_logged_in,
    });
  }
}

export default new UserController();

