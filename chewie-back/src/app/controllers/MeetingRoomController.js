
import MeetingRoom from '../models/MeetingRoom';

class MeetingRoomController {
    
    async store(req, res) {
        console.log('Data', req.body.name)
        const roomExists = await MeetingRoom.findOne({ where: {name: req.body.name} });

        if(roomExists) {
            return res.status(400).json({ error: 'Meeting room already exists.' });
        }

        const {id, name, room } = await MeetingRoom.create(req.body);

        return res.json({
            id,
            name,
            room,
            
        });
    }
}

export default new MeetingRoomController();
