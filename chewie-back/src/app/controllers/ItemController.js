import Item from '../models/Item';

class ItemController {
  async store(req, res) {
    const itemExists = await Item.findOne({
      where: {
        name: req.body.name
      }
    });

    if (itemExists) {
      return res.status(400).json({
        error: 'Item already exists.'
      });
    }
    
    const { id, name } = await Item.create(req.body);

    return res.status(201).json({
      id,
      name,
    });
  }

}

export default new ItemController();