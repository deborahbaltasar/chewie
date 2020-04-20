import Sequelize, { Model } from 'sequelize';

class MeetingRoom extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            room: Sequelize.STRING,
        },
        {
            sequelize,
        });

        return this;
   }

   static associate(models) {
    this.hasMany(models.RoomItem, {foreignKey: 'fk_meeting_room', sourceKey: 'id'});
   }
}
    
export default MeetingRoom;
