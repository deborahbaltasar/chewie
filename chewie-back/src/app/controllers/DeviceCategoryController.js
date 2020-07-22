import DeviceCategory from "../models/DeviceCategory";
import User from "../models/User";

class DeviceCategoryController {
    async show (req, res){
        const categories = await DeviceCategory.findAll({
            attributes: [
                'id',
                'name'
            ]
        });

        return res.json(categories);
    }

    async store (req, res) {
        const checkUserAdmin = await User.findOne({
            where: {id: req.userId, admin: true},
        });

        if(!checkUserAdmin) {
            return res.status(401).json({error: "Only admins can create a device category."})
        }

        const {name} = req.body;

        if (!name){
            return res.status(400).json({ error: 'Validation fail'});
        }

        const categoryExists = await DeviceCategory.findOne({where: {name: name}})

        if (categoryExists){
            return res.status(400).json({error: 'Device Category already exists.'});
        }

        const category = await DeviceCategory.create(req.body);

        return res.json(category)
    }

    async delete (req, res){
        const checkUserAdmin = await User.findOne({
            where: {id: req.userId, admin: true},
        });

        if(!checkUserAdmin) {
            return res.status(401).json({error: "Only admins can delete a device category."})
        }

        const { id } = req.params;

        const deviceCategory = await DeviceCategory.findByPk(id);

        if (!deviceCategory){
            return res.status(400).json({error: 'Device category does not exist.'});
        }

        deviceCategory.destroy();

        return res.json(deviceCategory);
    }
}

export default new DeviceCategoryController();