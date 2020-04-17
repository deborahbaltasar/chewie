import * as Yup from 'yup';
import Partner from '../models/Partner';

class PartnerController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            number: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail'});
        }

        const partnerExists = await Partner.findOne({ where: {email: req.body.email} });

        if(partnerExists) {
            return res.status(400).json({ error: 'Partner already exists.' });
        }

        const {id, name, email, number } = await Partner.create(req.body);

        return res.json({
            id,
            name,
            email,
            number,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            number: Yup.string(),

        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail'});
        }


        const {id, name, email, number} = await Partner.update(req.body);
        return res.json({
            id,
            name,
            email,
            number,
        });
    }
}

export default new PartnerController();