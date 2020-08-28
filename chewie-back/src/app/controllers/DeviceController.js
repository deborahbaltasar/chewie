import {Op, or} from "sequelize";
import * as Yup from 'yup';

import Device from "../models/Device";
import DeviceCategory from "../models/DeviceCategory";
import MeetingRoom from "../models/MeetingRoom";
import User from "../models/User";

class DeviceController {
  async store(req, res) {
    const checkUserAdmin = await User.findOne({
      where: {
        id: req.userId,
        admin: true
      },
    });

    if (!checkUserAdmin) {
      return res.status(401).json({
        error: "Only admins can create a device."
      })
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      meeting_room: Yup.number().required(),
      category: Yup.number().required(),
      quantity: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fail'
      });
    }

    const meeting_room = await MeetingRoom.findOne({
      where: {
        id: req.body.meeting_room
      }
    })

    if (!meeting_room) {
      return res.status(400).json({error: "Meeting Room does not exist"})
    }

    const category = await DeviceCategory.findOne({
      where: {
        id: req.body.category
      }
    })

    if (!category) {
      return res.status(400).json({
        error: "Meeting Room does not exist"
      })
    }

    const form = {
      name: req.body.name,
      fk_meeting_room: meeting_room.id,
      fk_device_category: category.id,
      quantity: req.body.quantity
    }

    const device = await Device.create(form);

    return res.status(201).json(device)
  }

  async show(req, res) {
    let { name , orderby, order } = req.query

    //Ex.
    //All Devices: GET /
    //Filter by name: /?name=filter
    //Filter by and and order by ID descending: /

    //Ignore orderby if order invalid
    if (orderby && !order || !(order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC')) orderby = undefined;

    const categories = await DeviceCategory.findAll({
      attributes: ['id', 'name']
    });

    const devices = {
      categories: await Promise.all(categories.map(async cat => {
        console.log(`name: ${cat.name}`)
        console.log(`id: ${cat.id}`)

        return {
          name: cat.name,
          devices: await Device.findAll({
            where: {
              fk_device_category: cat.id,
              name: {
                [Op.iLike]: name ? '%' + name + '%' : '%%'
              }
            },
            attributes: ['id', 'name', 'quantity'],
            include: [
              {
                model: MeetingRoom,
                attributes: ['id', 'name', 'room', 'description', 'admin']
              }
            ],
            order: orderby ? [
              [orderby, order]
            ] : []
          })
        }
      }))
    }

    return res.json(devices)
  }

  async delete (req, res){
    const checkUserAdmin = await User.findOne({
      where: {
        id: req.userId,
        admin: true
      },
    });

    if (!checkUserAdmin) {
      return res.status(401).json({
        error: "Only admins can delete a device."
      })
    }

    const { id } = req.params;

    const device = await Device.findByPk(id);

    if (!device) {
      return res.status(400).json({
        error: 'Device does not exist.'
      });
    }

    await device.destroy();

    return res.json(device);
  }
}

export default new DeviceController();